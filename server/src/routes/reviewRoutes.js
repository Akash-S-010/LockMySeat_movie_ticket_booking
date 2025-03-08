import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { addReview, getAllReviews } from "../controllers/reviewController.js";
const router = express.Router();


router.get('/add-review', checkAuth, addReview)
router.get('/getall-review', checkAuth, getAllReviews)

export default router