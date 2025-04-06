import express from "express";
import checkOwnerAdmin from "../middlewares/checkOwnerAdmin.js";
import checkOwner from "../middlewares/checkOwner.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import { addTheater, approveTheater, getAllApprovedTheaters, getAllTheaters, getOwnerTheaters, getTheaterDetails, getTotalTheaters, rejectTheater } from "../controllers/theaterController.js";
const router = express.Router();


router.post('/add-theater', checkOwner, addTheater)
router.get('/all-theaters', checkAdmin, getAllTheaters)
router.get('/owner-theaters', checkOwner, getOwnerTheaters)
router.get('/approved-theaters', checkAuth, getAllApprovedTheaters)
router.get('/theater-details/:id', checkAuth, getTheaterDetails)
router.get('/total-theaters', checkOwnerAdmin, getTotalTheaters)
router.put('/:id/approve', checkAdmin, approveTheater)
router.put('/:id/reject', checkAdmin, rejectTheater)

export default router