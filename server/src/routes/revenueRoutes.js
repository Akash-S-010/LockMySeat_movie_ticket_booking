import express from "express";
import { adminRevenue, theaterOwnerRevenue } from "../controllers/revenueController.js";
import checkOwner from "../middlewares/checkOwner.js";
import checkAdmin from "../middlewares/checkAdmin.js";
const router = express.Router();


router.get('/theaterOwner-revenue', checkOwner, theaterOwnerRevenue)
router.get('/admin-revenue', checkAdmin, adminRevenue)


export default router