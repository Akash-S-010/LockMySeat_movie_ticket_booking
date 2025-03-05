import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,

    },
    theaterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
        required: true,

    },
    date: {
        type: Date,
        required: true,
    },
    time: String,
    ticketPrice: {
        type: Number,
        required: true
    },
}, { timestamps: true });

export default mongoose.model('Show', showSchema);