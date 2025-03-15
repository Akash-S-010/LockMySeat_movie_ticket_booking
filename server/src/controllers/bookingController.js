import Booking from "../models/bookingModel.js";
import Show from "../models/showModel.js";

export const createBooking = async (req, res) => {
    
    const {showId, selectedSeats, totalPrice} = req.body;
    const userId = req.user.userId;

    try {
        
        if(!showId || !selectedSeats || !totalPrice || !userId){
            return res.status(400).json({ message: "All fields are required" });
        }

        const show = await Show.findById(showId);

        if(!show){
            return res.status(404).json({ message: "No show found" });
        }

        const existingBooking = await Booking.findOne({
            showId,
            seats: { $elemMatch: { seatNumber: { $in: selectedSeats }, status: { $in: ['pending', 'booked'] } } }
        });

        if(existingBooking){
            return res.status(400).json({ message: "Selected seats are already booked or processing Payment" });
        }

        const newBooking = new Booking({
            showId,
            userId,
            seats: selectedSeats.map(seat => ({ seatNumber: seat, status: 'pending' })),
            totalPrice,
            status: 'pending'
        })

        await newBooking.save();
        res.status(201).json({ message: "Booking created successfully", data: newBooking._id });

    } catch (error) {
        console.error("Error in createBooking controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// --------------get all bookings of specific use------------
export const getUserBookings = async (req, res) => {
    
    const userId = req.params.id;

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

        const formattedBookings = bookings.map(booking => ({
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
        res.status(200).json({ message: "Total bookings found", data: totalBookings });

        if(!totalBookings.length){
            return res.status(404).json({ message: "No bookings found" });
        }

    } catch (error) {
        console.error("Error in getTotalBookings controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



