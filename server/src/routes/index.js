import express from "express";
import authRoutes from "./authRoutes.js"
import movieRoutes from "./movieRoutes.js"
import showRoutes from "./showRoutes.js"
import theaterRoutes from "./theaterRoutes.js"
const router = express.Router();

// ---Auth routes----
router.use('/auth',authRoutes);
// ---User routes----
router.use('/user',authRoutes);
// ---Movie routes----
router.use('/movie',movieRoutes);
// ---Theater routes----
router.use('/theater',theaterRoutes);
// ---Show routes----
router.use('/show',showRoutes);


export default router