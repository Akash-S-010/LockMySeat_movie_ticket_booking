import Theater from "../models/theaterModel.js";


// ----------Add theater (Owner only)------------
export const addTheater = async (req, res) => {
    const { name, location, rows, cols } = req.body;
    const ownerId = req.user.userId

    try {

        if (!name || !location || !ownerId || !rows || !cols) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const numRows = parseInt(rows);
        const numCols = parseInt(cols);

        if (isNaN(numRows) || isNaN(numCols) || numRows <= 0 || numCols <= 0) {
            return res.status(400).json({ message: "Rows and columns must be valid positive numbers" });
        }

        // Create seats array----
        const seats = [];
        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                const seatNumber = `${String.fromCharCode(65 + r)}${c + 1}`;
                seats.push({ seatNumber, isBooked: "available" });
            }
        }

        const newTheater = new Theater({ name, location, ownerId, rows: numRows, cols: numCols, seatPattern: seats, status: "pending" });
        await newTheater.save();

        if (!newTheater) {
            return res.status(404).json({ message: "No theater found" });
        }
        res.status(201).json({ message: "Theater added successfully", data: newTheater })

    } catch (error) {
        console.error("Error in addTheater controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -----------get all theaters by owner------------
export const getOwnerTheaters = async (req, res) => {
    try {

        const theaters = await Theater.find({ ownerId: req.user.userId }).sort({ createdAt: -1 });

        if (!theaters) {
            return res.status(404).json({ message: "No theaters found" });
        }

        res.status(200).json({ message: "Theaters found", data: theaters })

    } catch (error) {
        console.error("Error in getOwnerTheaters controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}




// ------------get all theaters------------
export const getAllTheaters = async (req, res) => {

    try {

        const theaters = await Theater.find({}).sort({ createdAt: -1 });

        if (!theaters) {
            return res.status(404).json({ message: "No theaters found" });
        }

        res.status(200).json({ message: "Theaters found", data: theaters })

    } catch (error) {
        console.error("Error in getAllTheaters controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get all approved theaters------------
export const getAllApprovedTheaters = async (req, res) => {

    try {

        const theaters = await Theater.find({ status: "approved" });

        if (!theaters) {
            return res.status(404).json({ message: "No theaters found" });
        }

        res.status(200).json({ message: "Theaters found", data: theaters })

    } catch (error) {
        console.error("Error in getAllApprovedTheaters controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get theater details by id------------
export const getTheaterDetails = async (req, res) => {

    const theaterId = req.params.id;

    try {

        const theater = await Theater.findById({ _id: theaterId, status: "approved" });

        if (!theater) {
            return res.status(404).json({ message: "No theater found" });
        }

        res.status(200).json({ message: "Theater found", data: theater })

    } catch (error) {
        console.error("Error in getTheaterDetails controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get total theaters------------
export const getTotalTheaters = async (req, res) => {

    try {

        const theaters = await Theater.find({});

        if (!theaters) {
            return res.status(404).json({ message: "No theaters found" });
        }

        const totalTheaters = theaters.length;
        res.status(200).json({ message: "Total theaters found", data: totalTheaters })

    } catch (error) {
        console.error("Error in getTotalTheaters controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------approve theater------------
export const approveTheater = async (req, res) => {

    const theaterId = req.params.id;

    try {

        const theater = await Theater.findById(theaterId);

        if (!theater) {
            return res.status(404).json({ message: "No theater found" });
        }

        theater.status = "approved";
        await theater.save();

        res.status(200).json({ message: "Theater approved for add shows successfully" })

    } catch (error) {
        console.error("Error in approveTheater controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// ------------reject theater------------
export const rejectTheater = async (req, res) => {

    const theaterId = req.params.id;

    try {

        const theater = await Theater.findById(theaterId);

        if (!theater) {
            return res.status(404).json({ message: "No theater found" });
        }

        theater.status = "rejected";
        await theater.save();

        res.status(200).json({ message: "Theater rejected successfully" })

    } catch (error) {
        console.error("Error in rejectTheater controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};