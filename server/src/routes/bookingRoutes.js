import express from "express";
import { createBooking, getTotalBookings, getUserBookings } from "../controllers/bookingController.js";
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();

router.post('/create', checkAuth, createBooking)
router.get('/all-bookings', checkAuth, getUserBookings)
router.get('/total-bookings', checkAuth, getTotalBookings)



export default router