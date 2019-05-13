const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    seller: {
        type: String,
        //   default: '',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    auction: {
        type: Boolean,
        required: true
    },
    endtime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'rejected', 'active', 'expired', 'escrow', 'closed'],
        default: 'pending',
        required: true
    },
    image: {
        type: String,
        default: '',
    },
    friendDiscount: {
        type: Number,
        default: 0.0
    }
});

ListingSchema.index({
    name: 'text',
    description: 'text',
  }, {
    weights: {
      name: 3,
      description: 1,
    },
});

module.exports = mongoose.model('Listing', ListingSchema);