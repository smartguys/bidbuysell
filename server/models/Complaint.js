const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
	plaintiff : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	defendant : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	content : {
		type: String,
		required: true
	},
	date : {
		type: Date,
		default: Date.now()
	},
	isDelete : {
		type: Boolean,
		default: false
	},
	isResolved : {
		type: Boolean,
		default: false
	}
	isJustified : {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Complaint', ComplaintSchema);