import express from "express";
import { addShow, getShowByDate, getShowByLocation } from "../controllers/showController.js";
import checkOwner from "../middlewares/checkOwner.js";
import checkAuth from "../middlewares/checkAuth.js";
const  router = express.Router();


router.post('/add-show', checkOwner, addShow)
router.get('/by-date', checkAuth, getShowByDate)
router.get('/by-location', checkAuth, getShowByLocation)



export default router