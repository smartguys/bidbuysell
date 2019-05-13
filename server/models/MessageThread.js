const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({ 
	id : {
		type: Number,
		required: true
	},
	sender : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
		required: true
	},
	date : {
		type: Date,
		default: Date.now
	},
	content : {
		type: String,
		required: true
	}
	isDelete : {
		type: Boolean,
		default: false
	}
});

const MessageThreadSchema = new mongoose.Schema({ 
	id : {
		type: Number,
		required: true
	},
	users : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	messages : [MessageSchema]
});

module.exports = mongoose.model('MessageThread', MessageThreadSchema);