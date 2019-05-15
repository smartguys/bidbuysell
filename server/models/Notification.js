const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
	notifiedUser : {
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
	}
	isDelete : {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model.('Notification', NotificationSchema);