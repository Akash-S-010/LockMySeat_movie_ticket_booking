import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    seats: {
        type: [String],
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['booked', 'cancelled'],
        default: 'booked',
    },
},
    { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);

