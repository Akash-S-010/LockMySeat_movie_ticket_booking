import express from "express";
import userRoutes from "./userRoutes.js"
import adminRoutes from "./adminRoutes.js"
import movieRoutes from "./movieRoutes.js"
import theaterRoutes from "./theaterRoutes.js"
import showRoutes from "./showRoutes.js"
import bookingRoutes from "./bookingRoutes.js"
import paymentRoutes from "./paymentRoutes.js"
const router = express.Router();

// ---User routes----
router.use('/user',userRoutes);

// ---Admin routes----
router.use('/admin',adminRoutes);

// ---Movie routes----
router.use('/movie',movieRoutes);

// ---Theater routes----
router.use('/theater',theaterRoutes);

// ---Show routes----
router.use('/show',showRoutes);

// ---Booking routes----
router.use('/booking',bookingRoutes);

// ---Payment routes----
router.use('/payment',paymentRoutes);



export default router