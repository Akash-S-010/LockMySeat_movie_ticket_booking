import Movie from "../models/movieModel.js";
import Review from "../models/reviewModel.js";
import Booking from "../models/bookingModel.js";



// -------------add review------------
export const addReview = async (req, res) => {

    const movieId = req.params.movieId
    const {comment, rating} = req.body
    const userId = req.user.userId

    try {
        
        if(!comment || !rating){
            return res.status(400).json({ message: "Comment and rating are required" });
        }

        const movie = await Movie.findById(movieId)

        if(!movie){
           return  res.status(404).json({ message: "Movie not found" });
        }

        const movieBooked = await Booking.exists({
            userId,
            movieId,
            status: "booked",
        });

        if (!movieBooked) {
            return res.status(403).json({ message: "Only booked users can add a review" });
        }

        const newReview = new Review({
            movie:movieId, 
            user:userId, 
            comment, 
            rating
        });
        
        await newReview.save()

        movie.reviews.push(newReview)
        await movie.save()

        return res.status(201).json({ message: "Review added successfully", data: newReview })

    } catch (error) {
        console.error("Error in addReview controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get all reviews------------
export const getAllReviews = async (req, res) => {
    
    const movieId = req.params.id

    try {

        const reviews = await Review.find({movie:movieId})
        .populate("user", "name")
        .select("comment rating")

        if(!reviews.length){
           return res.status(404).json({ message: "No reviews found" });
        }

        res.status(200).json({ message: "Reviews found", data: reviews })

    } catch (error) {
        console.error("Error in getAllReviews controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};







