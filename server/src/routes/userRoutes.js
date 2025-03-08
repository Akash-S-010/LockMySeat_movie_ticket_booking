import express from "express";
import { checkUser, getAllMovies } from "../controllers/userControllers";
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();


router.get('/check-user', checkAuth, checkUser)



export default router