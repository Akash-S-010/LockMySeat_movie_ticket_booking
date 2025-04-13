import Show from "../models/showModel.js";
import Theater from "../models/theaterModel.js";
import Booking from "../models/bookingModel.js";
import Payment from "../models/paymentModel.js";

export const theaterOwnerRevenue = async (req, res) => {
    const ownerId = req.user.userId;

    try {

        const theaters = await Theater.find({ ownerId }).select("_id");

        if (!theaters.length) {
            return res.status(404).json({ message: "No theaters found" });
        }

        const theaterIds = theaters.map(t => t._id);

        // Find shows in these theaters
        const shows = await Show.find({ theaterId: { $in: theaterIds } }).select("_id");
        const showIds = shows.map(s => s._id);

        // Find bookings that are 'booked' and linked to these shows
        const bookings = await Booking.find({ showId: { $in: showIds }, status: "booked" });

        // Sum up the revenue
        const revenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

        res.status(200).json({
            message: "Revenue fetched successfully",
            revenue
        });

    } catch (error) {
        console.error("Error in theaterOwnerRevenue controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}


export const adminRevenue = async (req, res) => {
    try {
      const completedPayments = await Payment.find({ status: "completed" });
  
      const revenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  
      res.status(200).json({
        message: "Gross revenue fetched successfully",
        revenue
      });
    } catch (err) {
      console.error("Error calculating admin revenue:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  