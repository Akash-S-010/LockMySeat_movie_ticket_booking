import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema(
  {
    seatNumber: String, // e.g., "A1", "A2", etc.
    isBooked: { type: String, enum: ["available", "booked", "locked"], default: "available" }
  },
  { _id: false } 
);

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
        ref: 'admin',
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
    cols: {
        type: Number,
        required: true
    },
    seatPattern: [seatSchema],
}, { timestamps: true });

export default mongoose.model('Theater', theaterSchema);