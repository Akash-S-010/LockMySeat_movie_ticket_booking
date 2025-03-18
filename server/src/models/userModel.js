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
    profilePic: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {   
        type: Boolean,
        default: true
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
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }

}, { timestamps: true })

export default mongoose.model('User', userSchema);