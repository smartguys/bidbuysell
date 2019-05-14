const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    listing: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    bid : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Bid',
	},
});

module.exports = mongoose.model('Transaction', TransactionSchema);