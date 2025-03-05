import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'theaterOwner', 'admin'],
        default: 'user'
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }],
    otp: {
        type: String
      },
      otpExpires: {
        type: Date
      },
      
}, { timestamps: true })

export default mongoose.model('User', userSchema);