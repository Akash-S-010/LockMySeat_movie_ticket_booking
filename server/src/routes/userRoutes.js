import express from "express";
import { checkUser, getAllMovies } from "../controllers/userControllers";
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();


router.get('/check-user', checkAuth, checkUser)
router.get('/movies',getAllMovies)
router.get('/movie-details/:id', checkAuth)
router.get('/show', checkAuth)


export default router