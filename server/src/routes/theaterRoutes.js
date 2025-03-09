import express from "express";
import checkOwnerAdmin from "../middlewares/checkOwnerAdmin.js";
import checkOwner from "../middlewares/checkOwner.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import { addTheater, getAllApprovedTheaters, getAllTheaters, getTheaterDetails, getTotalTheaters } from "../controllers/theaterController.js";
const router = express.Router();


router.post('/add-theater', checkOwner, addTheater)
router.get('/all-theaters', checkAdmin, getAllTheaters)
router.get('/all-approved-theaters', checkAdmin, getAllApprovedTheaters)
router.get('/theater-details/:id', checkAuth, getTheaterDetails)
router.get('/total-theaters', checkOwnerAdmin, getTotalTheaters)
router.put('/:id/status', checkAdmin, approveTheater)

export default router