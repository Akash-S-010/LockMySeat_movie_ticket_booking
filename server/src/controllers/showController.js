import Theater from "../models/theaterModel.js";
import Movie from "../models/movieModel.js";
import Show from "../models/showModel.js";


// -------------add show------------
export const addShow = async (req, res) => {

    const { movieId, theaterId, date, time, ticketPrice, seats } = req.body;
    const ownerId = req.user._id

    try {
        
        if(!movieId || !theaterId || !date || !time || !ticketPrice || !seats){
            return res.status(400).json({ message: "All fields are required" });
        }

        const movie = await Movie.findById(movieId);

        if(!movie){
            return res.status(404).json({ message: "No movie found" });
        }

        const theater = await Theater.findById(theaterId);

        if(!theater){
            return res.status(404).json({ message: "No theater found" });
        }

        const newShow = new Show({ movieId, theaterId, date, time, ticketPrice, seats });
        await newShow.save();

        res.status(201).json({ message: "Show added successfully", data: newShow });

    } catch (error) {
      console.log("Error in addShow controller",error);
      res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });  
    }
};




// 