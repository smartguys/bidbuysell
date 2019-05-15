const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
	sender : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	date : {
		type: Date,
		default: Date.now
	},
	content : {
		type: String,
		required: true
	},
	isDelete : {
		type: Boolean,
		default: false
	}
});

var Message = mongoose.model('Message', MessageSchema);

const MessageThreadSchema = new mongoose.Schema({
	users : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	messages : [Message.schema]
});

var MessageThread = mongoose.model('MessageThread', MessageThreadSchema);

module.exports = {
	Message,
	MessageThread
};