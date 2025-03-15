import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
    role: {
        type: String,
        enum: ['theaterOwner', 'admin'],
        default: 'admin'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
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

export default mongoose.model('Admin', adminSchema);