import Theater from "../models/theaterModel.js";
import Movie from "../models/movieModel.js";
import Show from "../models/showModel.js";


// -------------add show------------
export const addShow = async (req, res) => {

    const { movieId, theaterId, dateTime, ticketPrice } = req.body;
    const ownerId = req.user.userId;

    try {
        if (!movieId || !theaterId || !dateTime || !ticketPrice) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(dateTime < new Date()) {
            return res.status(400).json({ message: "Please provide future date and time" });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "No movie found" });
        }

        const theater = await Theater.findById(theaterId);
        if (!theater) {
            return res.status(404).json({ message: "No theater found" });
        }

        if (theater.status !== "approved") {
            return res.status(400).json({ message: "Theater is not approved" });
        }

        //-------check requested user is owner of theater---
        if (theater.ownerId.toString() !== ownerId) {
            return res.status(403).json({ message: "Unauthorized: Not your theater" });
        }

        const existingShow = await Show.findOne({ movieId, theaterId, dateTime });
        if (existingShow) {
            return res.status(400).json({ message: "Show already exists with same date and time" });
        }

        const seats = Array(theater.rows)
        .fill()
        .map(() => Array(theater.cols).fill("available"));

        const newShow = new Show({
            movieId,
            theaterId,
            dateTime: new Date(dateTime),
            ticketPrice,
            ownerId,
            seats
        });

        await newShow.save();

        res.status(201).json({ message: "Show added successfully", data: newShow });

    } catch (error) {
        console.error("Error in addShow controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};





// -------------get show by date  ( GET /api/shows/by-date?movieId=65e9d6a8bfc1234567890def&date=2025-03-13 )------------
export const getShowByDate = async (req, res) => {
    const { date, movieId } = req.query;
  
    try {
      if (!date || !movieId) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Parse the date as UTC explicitly
      const startDate = new Date(`${date}T00:00:00.000Z`); // e.g., "2025-03-31T00:00:00.000Z"
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1); // Next day in UTC
  
      const shows = await Show.find({
        movieId: movieId,
        dateTime: { $gte: startDate, $lt: endDate },
      }).populate("theaterId", "name location");
  
      if (!shows.length) {
        return res.status(404).json({ message: "No shows found" });
      }
  
      const formattedShows = shows.map((show) => ({
        ...show._doc,
        formattedDate: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
          new Date(show.dateTime)
        ),
        formattedTime: new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }).format(new Date(show.dateTime)),
      }));
  
      res.status(200).json({ message: "Shows found", data: formattedShows });
    } catch (error) {
      console.error("Error in getShowByDate controller", error);
      res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
  };




// -------------get show by location  ( GET /api/shows/by-location?location=Thalassery )------------
export const getShowByLocation = async (req, res) => {

    const { location } = req.query;

    try {
        
        if(!location){
            return res.status(400).json({ message: "Location Not Found" });
        }

        const theaters = await Theater.find({ location: { $regex: new RegExp(location, "i") } });

        if(!theaters.length){
            return res.status(404).json({ message: "No theaters found" });
        }

        const shows = await Show.find({ theaterId: { $in: theaters.map(theater => theater._id) } })
        .populate("theaterId", "name location")

        if(!shows.length){
            return res.status(404).json({ message: "No shows found" });
        }

        res.status(200).json({ message: "Shows found", data: shows });

    } catch (error) {
        console.error("Error in getShowByLocation controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get all shows----------------
export const getAllShows = async (req, res) => {
    
    try {
        
        const shows = await Show.find({}).sort({ createdAt: -1 });

        if(!shows.length){
            return res.status(404).json({ message: "No shows found" });
        }

        res.status(200).json({ message: "Shows found", data: shows });

    } catch (error) {
        console.error("Error in getAllShows controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get seats pattern with status------------
export const getSeats = async (req, res) => {
    try {
      const { showId } = req.params;
      const show = await Show.findById(showId)
        .populate('movieId') // Populate movie details
        .populate('theaterId'); // Populate theater details
  
      if (!show) {
        return res.status(404).json({ message: 'Show not found' });
      }
  
      if (new Date(show.dateTime) <= new Date()) {
        return res.status(400).json({ message: 'Show has already started' });
      }
  
      // Check if populated fields exist
      if (!show.movieId || !show.theaterId) {
        return res.status(500).json({ message: 'Invalid show data: Missing movie or theater details' });
      }
  
      // Format the dateTime field using Intl.DateTimeFormat
      const date = new Date(show.dateTime);
  
      // Format the date (e.g., "April 1, 2025")
      const formattedShowDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
  
      // Format the time (e.g., "05:30 AM")
      const formattedShowTime = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(date);
  
      // Get seat layout from theater
      const rows = show.theaterId.rows || 7; // Fallback to 7 if missing
      const columns = show.theaterId.cols || 10; // Fallback to 10 if missing
  
      // Transform the 2D seats array into an array of objects
      const transformedSeats = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const seatId = `${String.fromCharCode(65 + row)}${col + 1}`; // e.g., "A1", "A2", ...
          const seatStatus = show.seats[row]?.[col] || 'available'; // Fallback to 'available' if missing
          transformedSeats.push({
            id: seatId,
            isBooked: seatStatus === 'booked' || seatStatus === 'locked', // Treat "locked" as booked for the frontend
          });
        }
      }
  
      res.status(200).json({
        seats: transformedSeats,
        ticketPrice: show.ticketPrice || 0,
        movieTitle: show.movieId.title || 'Unknown Movie',
        theaterName: show.theaterId.name || 'Unknown Theater',
        theaterLocation: show.theaterId.location || 'Unknown Location',
        showDate: formattedShowDate, // e.g., "April 1, 2025"
        showTime: formattedShowTime, // e.g., "05:30 AM"
        dateTime: show.dateTime, // Raw dateTime for reference
        seatLayout: { rows, columns },
      });
    } catch (error) {
      console.error('Error in getSeats:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };