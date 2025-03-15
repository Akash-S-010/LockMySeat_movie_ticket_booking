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
        type: [[String]], // Use available, booked, locked
        required: true
    },
    status: {
        type: String,
        enum: ["notStarted", "started", "expired"],
        default: "notStarted",
    }


}, { timestamps: true });

export default mongoose.model('Show', showSchema);