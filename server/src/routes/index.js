import express from "express";
import authRoutes from "./authRoutes.js"
const router = express.Router();

// ---Auth routes----
router.use('/auth',authRoutes);
// ---User routes----
router.use('/user',authRoutes);


export default router