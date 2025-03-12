import Movie from "../models/movieModel.js";



// -------------add movie (Admin only)------------
export const addMovie = async (req, res) => {
    const { title, duration, genre, plot, cast, releaseDate, language, bannerImg, verticalImg } = req.body;

    try {
        
        if (!title || !duration || !genre || !plot || !cast || !releaseDate || !language || !bannerImg || !verticalImg) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newMovie = new Movie({ title, duration, genre, plot, cast, releaseDate, language, bannerImg, verticalImg });

        await newMovie.save();

        res.json({ message: "Movie added successfully", data: newMovie });

    } catch (error) {
        console.log("Error in addMovie controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
   
};




// -------------update movie by id (Admin only)------------
export const updateMovie = async(req, res) => {

    const movieId = req.params.id;
    const { title, duration, genre, plot, cast, releaseDate, language, bannerImg, verticalImg } = req.body;

    try {
        
        const updatedMovie = await Movie.findByIdAndUpdate(
            movieId,
            { title, duration, genre, plot, cast, releaseDate, language, bannerImg, verticalImg }, 
            {new: true}
        )

        if(!updatedMovie){
            res.status(404).json({ message: "No movie found" });
        }

        res.status(200).json({ message: "Movie updated successfully", data: updatedMovie });

    } catch (error) {
        console.log("Error in updateMovie controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------delete movie by id (Admin only)------------
export const deleteMovie = async (req, res) => {

    const movieId = req.params.id;

    try {
        
        const movie = await Movie.findByIdAndDelete(movieId);

        if(!movie){
            res.status(404).json({ message: "No movie found" });
        }

        res.json({ message: "Movie deleted successfully"});

    } catch (error) {
        console.log("Error in deleteMovie controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get all movies------------
export const getAllMovies = async (req, res) => {

        try {

            const movies = await Movie.find().select("-reviews", "-cast", "-plot", "-duration", "-releaseDate");
            if (!movies) {
                res.status(404).json({ message: "No movies found" });
            }

            res.json({ message: "Movies found", data: movies });

        } catch (error) {
            console.log("Error in getAllMovies controller", error);
            res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
        }
    };




    // -------------get movie details------------
    export const getMovieDetails = async (req, res) => {

        const movieId = req.params.id;

        try {

            const movie = await Movie.findById(movieId).populate({
                path: "reviews",
                select: "comment rating", // ✅ Fetch only comment and rating
                populate: { path: "user", select: "name" } // ✅ Fetch only user name
            })

            if (!movie) {
                res.status(404).json({ message: "No movie found" });
            }

            res.json({ message: "Movie found", data: movie });

        } catch (error) {
            console.log("Error in getMovieDetails controller", error);
            res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
        }
    };




// ----------------Total movies count------------
export const totalMovies = async (req, res) => {
    
    try {
        
        const movies = await Movie.find({});
        if(!movies){
            res.status(404).json({ message: "No movies found" });
        }

        const totalMovies = movies.length;
        res.json({ message: "Total movies found", data: totalMovies });

    } catch (error) {
        console.log("Error in totalMovies controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}