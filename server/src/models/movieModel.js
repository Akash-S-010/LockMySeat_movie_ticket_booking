import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    genre: [{
        type: String,
        required: true,
    }],
    plot: {
        type: String,
        required: true,
        max: 200,
    },
    cast: [{
        type: String,
    }],
    releaseDate: {
        type: Date,
        required: true,
    },
    language: [{
        type: String,
        required: true,
    }],
    bannerImg: {
        type: String,
        required: true,
    }, 
    verticalImg: {
        type: String,
        required: true,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],

},
    { timestamps: true }
);

export default mongoose.model('Movie', movieSchema);