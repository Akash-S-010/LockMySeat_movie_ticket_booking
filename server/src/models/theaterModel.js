import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
    row: Number,
    col: Number,
    isBooked: { type: Boolean, default: false } // Stores seat 
});

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        index: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'

    },
    rows: {
        type: Number,
        required: true
    },
    columns: {
        type: Number,
        required: true
    },
    seatPattern: [seatSchema],
}, { timestamps: true });

export default mongoose.model('Theater', theaterSchema);