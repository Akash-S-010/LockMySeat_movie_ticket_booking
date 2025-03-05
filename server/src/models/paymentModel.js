import mongoose from 'mongoose';


const paymentSchema = new mongoose.Schema({
    transaction_id: {
        type: String,
        required: true,
        unique: true
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

