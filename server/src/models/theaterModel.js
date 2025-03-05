import mongoose from 'mongoose';

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
    seats: { 
        type: [[Boolean]], 
        default: Array(10).fill().map(() => Array(10).fill(false)) 

    },
}, { timestamps: true });

export default mongoose.model('Theater', theaterSchema);