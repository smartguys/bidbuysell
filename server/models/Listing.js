const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    seller: {
        type: String,
        //   default: ''
    },
    name: {
        type: String
    },
    description: {
        type: String,
    },
    user: {
        type: String,
    },
    price: {
        type: Number,
    },
    endtime: {
        type: Date,
    },
    status: {
        type: String,
    },
    image: {
        type: String,
        default: ''
    },
    friendDiscount: {
        type: Number,
        default: 0.0
    }
});

module.exports = mongoose.model('Listing', ListingSchema);
