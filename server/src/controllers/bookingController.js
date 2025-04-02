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

        const newBooking = new Booking({
            showId,
            userId,
            selectedSeats: selectedSeats.map(seat => ({ seatNumber: seat, status: "pending" })),
            totalPrice,
            status: "pending",
            createdAt: new Date() // Store timestamp
        });

        await newBooking.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: "Booking created, awaiting payment",
            bookingId: newBooking._id
        });
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

        if (!userId) {
            return res.status(400).json({ message: "User id is required" });
        }

        const bookings = await Booking.find({ userId })
            .populate({
                path: "showId",
                select: "movieId theaterId dateTime",
                populate: [
                    { path: "movieId", select: "title verticalImg" },
                    { path: "theaterId", select: "name location" }
                ]
            })
            .select("showId selectedSeats status totalPrice createdAt")
            .sort({ createdAt: -1 }); 

        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found" });
        }


        // ----formatted for good structure and readability----
        const formattedBookings = bookings.filter(booking => booking.showId) // Exclude deleted shows
            .map(booking => ({
                bookingId: booking._id,
                movieName: booking.showId.movieId.title,
                moviePoster: booking.showId.movieId.verticalImg,
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
        console.error("Error in getUserBookings controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// --------------get total bookings------------
export const getTotalBookings = async (req, res) => {

    try {

        const totalBookings = await Booking.countDocuments({});

        if (!totalBookings.length) {
            return res.status(404).json({ message: "No bookings found" });
        }

        res.status(200).json({ message: "Total bookings found", data: totalBookings });

    } catch (error) {
        console.error("Error in getTotalBookings controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



