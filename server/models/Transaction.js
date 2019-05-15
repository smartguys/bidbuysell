const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'Listing',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    bid : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Bid',
    },
    note: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);