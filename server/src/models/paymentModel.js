import mongoose from 'mongoose';


const paymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },
    razorpay_payment_id: {
        type: String,
        unique: true,
        sparse: true
    },
    razorpay_signature: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },    
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
        required: true
    },
}, 
{ timestamps: true });

export default mongoose.model('payment', paymentSchema);

