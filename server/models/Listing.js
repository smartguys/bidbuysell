const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    seller: {
        type: String,
        //   default: ''
    },
    description: {
        type: String,
        default: ''
    },
    user: {
        type: String,
        //   default: ''
    },
    price: {
        type: Number,
        // default: 0.0
    },
    endtime: {
        type: Date,
        //   default: ''
    },
    status: {
        type: String,
        //   default: ''
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
