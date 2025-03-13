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
    dateTime: { //-------- Combined Date & Time Field
        type: Date,
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    seats: { 
        type: [[Boolean]], //----------------2D array of seats (true = booked, false = available)
        required: true
    }

}, { timestamps: true });

export default mongoose.model('Show', showSchema);