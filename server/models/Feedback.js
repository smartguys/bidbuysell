const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
	reviewer : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	userReviewed : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	content : {
		type: String,
		required: true
	},
	rating : {
		type: Number,
		required: true
	},
	date : {
		type: Date,
		default: Date.now()
	},
	isDelete : {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Feedback', FeedbackSchema);