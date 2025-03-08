import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import checkOwner from "../middlewares/checkOwner.js";
import { addMovie, deleteMovie, getAllMovies, getMovieDetails } from "../controllers/MovieController.js";
import { addReview, getAllReviews } from "../controllers/reviewController.js";
const router = express.Router();


// -----------Movie routes-----------
router.post('/add-movie', checkAdmin, addMovie)
router.delete('/delete-movie/:id', checkAdmin, deleteMovie)
router.get('/movies',getAllMovies)
router.get('/movie-details/:id', checkAuth, getMovieDetails)
router.get('/total-movies',checkAdmin,checkOwner,totalMovies)


// -----------Review routes-----------
router.post('/:movieId/add-review', checkAuth, addReview)
router.get('/:movieId/getall-reviews', checkAuth, getAllReviews)

export default router