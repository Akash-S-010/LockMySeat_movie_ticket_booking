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
      
}, { timestamps: true })

export default mongoose.model('Admin', adminSchema);