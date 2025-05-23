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
        console.error("Error in addMovie controller",error);
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
            return res.status(404).json({ message: "No movie found" });
        }

        res.status(200).json({ message: "Movie updated successfully", data: updatedMovie });

    } catch (error) {
        console.error("Error in updateMovie controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------delete movie by id (Admin only)------------
export const deleteMovie = async (req, res) => {

    const movieId = req.params.id;

    try {
        
        const movie = await Movie.findByIdAndDelete(movieId);

        if(!movie){
            return res.status(404).json({ message: "No movie found" });
        }

        res.json({ message: "Movie deleted successfully"});

    } catch (error) {
        console.error("Error in deleteMovie controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get all movies------------
export const getAllMovies = async (req, res) => {
  try {
    const { limit = 100, skip = 0, sort = "-createdAt", language, genre } = req.query;

    // Build the query object
    const query = {};
    if (language) {
      query.language = { $in: [language] }; // Match movies with the specified language
    }
    if (genre) {
      query.genre = { $in: [genre] }; // Match movies with the specified genre
    }

    const movies = await Movie.find(query)
      .select("-reviews -cast -plot")
      .sort(sort)
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    const formattedMovies = movies.map((movie) => ({
      ...movie.toObject(),
      releaseDate: new Date(movie.releaseDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    }));

    res.json({ message: "Movies found", data: formattedMovies });
  } catch (error) {
    console.error("Error in getAllMovies controller", error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};




    // -------------get movie details------------
    export const getMovieDetails = async (req, res) => {

        const movieId = req.params.id;

        try {

            const movie = await Movie.findById(movieId).populate({
                path: "reviews",
                select: "comment rating", // ✅ Fetch only comment and rating
                populate: { path: "userId", select: "name" } // ✅ Fetch only user name
            })

            if (!movie) {
                return res.status(404).json({ message: "No movie found" });
            }

            res.json({ message: "Movie found", data: movie });

        } catch (error) {
            console.error("Error in getMovieDetails controller", error);
            res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
        }
    };




// ----------------Total movies count------------
export const totalMovies = async (req, res) => {
    
    try {
        
        const movies = await Movie.find({});
        if(!movies){
            return res.status(404).json({ message: "No movies found" });
        }

        const totalMovies = movies.length;
        res.json({ message: "Total movies found", data: totalMovies });

    } catch (error) {
        console.error("Error in totalMovies controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}