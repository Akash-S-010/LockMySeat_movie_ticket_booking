import express from "express";
import { addShow, getAllShows, getSeats, getShowByDate, getShowByLocation, getTotalShows } from "../controllers/showController.js";
import checkOwner from "../middlewares/checkOwner.js";
import checkAuth from "../middlewares/checkAuth.js";
const  router = express.Router();


router.post('/add-show', checkOwner, addShow)
router.get('/by-date', checkAuth, getShowByDate)
router.get('/by-location', checkAuth, getShowByLocation)
router.get('/all-shows', checkOwner, getAllShows)
router.get('/seats/:showId', checkAuth, getSeats)
router.get('/total-shows', checkOwner, getTotalShows)



export default router