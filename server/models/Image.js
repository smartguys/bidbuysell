const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'untitled'
    },
    data: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Image', ImageSchema);