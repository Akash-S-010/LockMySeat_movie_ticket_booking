import Theater from "../models/theaterModel.js";


// ----------Add theater (Owner only)------------
export const addTheater = async (req, res) => {
    const { name, location, ownerId, seats } = req.body;

    try {
        
        if(!name || !location || !ownerId || !seats){
            res.status(400).json({ message: "All fields are required" });
        }

        const theater = new Theater({
            name,
            location,
            ownerId,
            status: "pending",
            seats
        })

        const newTheater = await theater.save()

        if(!newTheater){
            res.status(404).json({ message: "No theater found" });
        }
        res.status(201).json({ message: "Theater added successfully", data: newTheater })

    } catch (error) {
        console.log("Error in addTheater controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// ------------get all theaters------------
export const getAllTheaters = async (req, res) => {
    
    try {
        
        const theaters = await Theater.find({});

        if(!theaters){
            res.status(404).json({ message: "No theaters found" });
        }

        res.status(200).json({ message: "Theaters found", data: theaters })

    } catch (error) {
        console.log("Error in getAllTheaters controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get theater details by id------------
export const getTheaterDetails = async (req, res) => {

    const theaterId = req.params.id;

    try {
        
        const theater = await Theater.findById(theaterId);

        if(!theater){
            res.status(404).json({ message: "No theater found" });
        }

        res.status(200).json({ message: "Theater found", data: theater })

    } catch (error) {
        console.log("Error in getTheaterDetails controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get total theaters------------
export const getTotalTheaters = async (req, res) => {
    
    try {
        
        const theaters = await Theater.find({});

        if(!theaters){
            res.status(404).json({ message: "No theaters found" });
        }

        const totalTheaters = theaters.length;
        res.status(200).json({ message: "Total theaters found", data: totalTheaters })

    } catch (error) {
        console.log("Error in getTotalTheaters controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};