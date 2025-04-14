import Show from "../models/showModel.js";
import Theater from "../models/theaterModel.js";
import Booking from "../models/bookingModel.js";
import Payment from "../models/paymentModel.js";

export const theaterOwnerRevenue = async (req, res) => {
  const ownerId = req.user.userId;
  const { timeRange = 'month' } = req.query;

  try {
    const theaters = await Theater.find({ ownerId }).select("_id");
    if (!theaters.length) {
      return res.status(404).json({ message: "No theaters found" });
    }

    const theaterIds = theaters.map(t => t._id);
    const shows = await Show.find({ theaterId: { $in: theaterIds } }).select("_id");
    const showIds = shows.map(s => s._id);

    // Define date range
    let startDate;
    const now = new Date();
    if (timeRange === 'week') startDate = new Date(now.setDate(now.getDate() - 7));
    else if (timeRange === 'year') startDate = new Date(now.setFullYear(now.getFullYear() - 1));
    else startDate = new Date(now.setMonth(now.getMonth() - 1));

    // Fetch booked bookings for revenue and seats
    const bookings = await Booking.find({
      showId: { $in: showIds },
      status: "booked",
      createdAt: { $gte: startDate }
    }).select("totalPrice selectedSeats createdAt");

    // Group revenue and seats by date
    const revenueByDate = {};
    const seatsByDate = {};

    bookings.forEach(b => {
      const date = b.createdAt.toISOString().split('T')[0];
      revenueByDate[date] = (revenueByDate[date] || 0) + b.totalPrice;
      // Count only seats with status 'booked' within selectedSeats
      const bookedSeats = b.selectedSeats.filter(seat => seat.status === 'booked').length;
      seatsByDate[date] = (seatsByDate[date] || 0) + bookedSeats;
    });

    // Format for chart
    const dates = Object.keys(revenueByDate).sort();
    const revenueData = dates.map(d => revenueByDate[d] || 0);
    const seatsData = dates.map(d => seatsByDate[d] || 0);

    // Calculate totals
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
    const totalSeats = bookings.reduce((sum, b) => sum + b.selectedSeats.filter(seat => seat.status === 'booked').length, 0);

    res.status(200).json({
      message: "Revenue fetched successfully",
      revenue: totalRevenue,
      chartData: {
        labels: dates,
        revenue: revenueData,
        seats: seatsData
      },
      totalSeats
    });
  } catch (error) {
    console.error("Error in theaterOwnerRevenue controller", error);
    res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
  }
};




export const adminRevenue = async (req, res) => {
  try {
    const { timeRange = 'month' } = req.query;

    // Define date range
    let startDate;
    const now = new Date();
    if (timeRange === 'week') startDate = new Date(now.setDate(now.getDate() - 7));
    else if (timeRange === 'year') startDate = new Date(now.setFullYear(now.getFullYear() - 1));
    else startDate = new Date(now.setMonth(now.getMonth() - 1));

    // Fetch completed payments for revenue
    const payments = await Payment.find({
      status: "completed",
      createdAt: { $gte: startDate }
    }).select("amount createdAt");

    // Fetch booked bookings for seats
    const bookings = await Booking.find({
      status: "booked",
      createdAt: { $gte: startDate }
    }).select("selectedSeats createdAt");

    // Group revenue and seats by date
    const revenueByDate = {};
    const seatsByDate = {};

    payments.forEach(p => {
      const date = p.createdAt.toISOString().split('T')[0];
      revenueByDate[date] = (revenueByDate[date] || 0) + p.amount;
    });

    bookings.forEach(b => {
      const date = b.createdAt.toISOString().split('T')[0];
      const bookedSeats = b.selectedSeats.filter(seat => seat.status === 'booked').length;
      seatsByDate[date] = (seatsByDate[date] || 0) + bookedSeats;
    });

    // Format for chart
    const dates = [...new Set([...Object.keys(revenueByDate), ...Object.keys(seatsByDate)])].sort();
    const revenueData = dates.map(d => revenueByDate[d] || 0);
    const seatsData = dates.map(d => seatsByDate[d] || 0);

    // Calculate totals
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalSeats = bookings.reduce((sum, b) => sum + b.selectedSeats.filter(seat => seat.status === 'booked').length, 0);

    res.status(200).json({
      message: "Gross revenue fetched successfully",
      revenue: totalRevenue,
      chartData: {
        labels: dates,
        revenue: revenueData,
        seats: seatsData
      },
      totalSeats
    });
  } catch (err) {
    console.error("Error calculating admin revenue:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};