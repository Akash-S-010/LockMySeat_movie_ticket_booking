import Booking from "../models/bookingModel.js";
import Show from "../models/showModel.js";
import mongoose from "mongoose";


export const createBooking = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { showId, selectedSeats, totalPrice } = req.body;
        const userId = req.user.userId;

        if (!showId || !selectedSeats || !totalPrice || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const show = await Show.findById(showId).session(session);
        if (!show) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Show not found" });
        }

        // Convert selected seats to row and column indices
        const seatIndices = selectedSeats.map(seat => {
            const row = seat.charCodeAt(0) - 65; 
            const col = parseInt(seat.substring(1)) - 1;
            return { row, col };
        });

        // Check if selected seats are available
        for (let { row, col } of seatIndices) {
            if (show.seats[row][col] !== "available") {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ message: `Seat ${selectedSeats} is already taken` });
            }
        }

        //---- Lock seats temporary for payment
        seatIndices.forEach(({ row, col }) => {
            show.seats[row][col] = "locked"; 
        });

        await show.save({ session });

        const newBooking = new Booking({
            showId,
            userId,
            selectedSeats: selectedSeats.map(seat => ({ seatNumber: seat, status: "pending" })),
            totalPrice,
            status: "pending"
        });

        await newBooking.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: "Booking created, seats locked", bookingId: newBooking._id });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Error creating booking" });
    }
};






// --------------get all bookings of specific use------------
export const getUserBookings = async (req, res) => {
    
    const userId = req.user.userId;

    try {
        
        if(!userId){
            return res.status(400).json({ message: "User id is required" });
        }

        const bookings = await Booking.find({ userId })
            .populate({
                path: "showId",
                select: "movieId theaterId dateTime",
                populate: [
                    { path: "movieId", select: "title posterImage" },
                    { path: "theaterId", select: "name location" }
                ]
            })
            .select("showId selectedSeats status totalPrice createdAt");

        if(!bookings.length){
            return res.status(404).json({ message: "No bookings found" });
        }

        // ----formatted for good structure and readability----
        const formattedBookings = bookings.filter(booking => booking.showId) // Exclude deleted shows
        .map(booking => ({
            bookingId: booking._id,
            movieName: booking.showId.movieId.title,
            movieImage: booking.showId.movieId.verticalImg,
            theaterName: booking.showId.theaterId.name,
            showDate: booking.showId.dateTime.toDateString(),
            showTime: booking.showId.dateTime.toTimeString(),
            bookedSeats: booking.selectedSeats.map(seat => seat.seatNumber),
            status: booking.status,
            totalPrice: booking.totalPrice
        }));

        res.status(200).json({ message: "Bookings found", data: formattedBookings });

    } catch (error) {
        console.error("Error in getUserBookings controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// --------------get total bookings------------
export const getTotalBookings = async (req, res) => {
    
    try {
        
        const totalBookings = await Booking.countDocuments({});
        
        if(!totalBookings.length){
            return res.status(404).json({ message: "No bookings found" });
        }
        
        res.status(200).json({ message: "Total bookings found", data: totalBookings });
        
    } catch (error) {
        console.error("Error in getTotalBookings controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



