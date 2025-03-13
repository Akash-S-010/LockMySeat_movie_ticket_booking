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

        if (theater.ownerId.toString() !== ownerId) {
            return res.status(403).json({ message: "Unauthorized: Not your theater" });
        }

        const existingShow = await Show.findOne({ movieId, theaterId, dateTime });
        if (existingShow) {
            return res.status(400).json({ message: "Show already exists with same date and time" });
        }

        const seats = Array(theater.rows)
        .fill()
        .map(() => Array(theater.cols).fill(false));

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
        
        if(!date || !movieId){
            return res.status(400).json({ message: "All fields are required" });
        }

        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);

        const shows = await Show.find({
            movieId: movieId,
            dateTime: { $gte: startDate, $lt: endDate }
        })
        .populate("theaterId", "name location")

        if(!shows.length){
            return res.status(404).json({ message: "No shows found" });
        }

        const formattedShows = shows.map(show => ({
            ...show._doc,
            formattedDate: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(show.dateTime)),
            formattedTime: new Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }).format(new Date(show.dateTime))
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
        
        const shows = await Show.find({});

        if(!shows.length){
            return res.status(404).json({ message: "No shows found" });
        }

        res.status(200).json({ message: "Shows found", data: shows });

    } catch (error) {
        console.error("Error in getAllShows controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};