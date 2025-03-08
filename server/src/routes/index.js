import express from "express";
import authRoutes from "./authRoutes.js"
import movieRoutes from "./movieRoutes.js"
const router = express.Router();

// ---Auth routes----
router.use('/auth',authRoutes);
// ---User routes----
router.use('/user',authRoutes);
// ---Movie routes----
router.use('/movie',movieRoutes);


export default router