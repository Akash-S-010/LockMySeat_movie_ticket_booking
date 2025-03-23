import Razorpay from "razorpay";
import Booking from "../models/bookingModel.js";
import Payment from "../models/paymentModel.js";
import mongoose from "mongoose";
import Show from "../models/showModel.js";
import crypto from "crypto";
import User from "../models/userModel.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    const { amount, bookingId } = req.body;
    const userId = req.user.userId;

    try {
        if (!amount || !bookingId) {
            return res.status(400).json({ message: "Amount and bookingId are required" });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.userId.toString() !== userId) {
            return res.status(404).json({ message: "Booking not found or unauthorized" });
        }

        const existingPayment = await Payment.findOne({ bookingId });
        if (existingPayment) {
            return res.status(400).json({ message: "Payment already exists for this booking" });
        }

        const options = {
            amount: amount * 100,//convert to smallest unit
            currency: "INR",
            receipt: `receipt_${bookingId}`,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);
        if (!order || !order.id) {
            return res.status(500).json({ message: "Failed to create Razorpay order" });
        }

        const payment = new Payment({
            razorpay_order_id: order.id,
            userId,
            amount,
            bookingId,
            status: "pending",
        });

        await payment.save();
        console.log("Payment saved successfully");

        res.status(200).json({
            message: "Order created successfully",
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error("Error in createOrder controller:", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};





// -----------payment verification------------
export const paymentVerification = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
        const userId = req.user.userId;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
            return res.status(400).json({ message: "Invalid payment details" });
        }

        const booking = await Booking.findById(bookingId).session(session);
        if (!booking || booking.userId.toString() !== req.user.userId) { // ✅ Check User Ownership
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Booking not found or unauthorized" });
        }

        const show = await Show.findById(booking.showId).session(session);
        if (!show) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Show not found" });
        }

        // **Verify Razorpay Signature**
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            booking.status = "booked";
            booking.selectedSeats.forEach(seat => seat.status = "booked");
            await booking.save({ session });

            const payment = await Payment.findOne({ razorpay_order_id }).session(session);
            if (payment) {
                payment.status = "completed";
                payment.razorpay_payment_id = razorpay_payment_id;
                payment.razorpay_signature = razorpay_signature;
                await payment.save({ session });
            }

            booking.selectedSeats.forEach(seat => {
                const row = seat.seatNumber.charCodeAt(0) - 65;
                const col = parseInt(seat.seatNumber.substring(1)) - 1;
                show.seats[row][col] = "booked";
            });

            show.markModified("seats");
            await show.save({ session });

            // Push the bookingId to the user's bookings array
            await User.findByIdAndUpdate(userId, {
                $push: { bookings: bookingId }
            }).session(session);

            await session.commitTransaction();
            session.endSession();
            return res.status(200).json({ message: "Payment verified, booking confirmed!" });
        } else {
            return res.status(400).json({ message: "Payment verification failed" });
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Error verifying payment", error: error.message });
    }

};