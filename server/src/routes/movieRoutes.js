import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import checkOwner from "../middlewares/checkOwner.js";
import { addMovie, getAllMovies, getMovieDetails } from "../controllers/MovieController.js";
const router = express.Router();


router.post('/add-movie', checkAdmin, addMovie)
router.delete('/delete-movie/:id', checkAdmin, deleteMovie)
router.get('/movies',getAllMovies)
router.get('/movie-details/:id', checkAuth, getMovieDetails)

export default router