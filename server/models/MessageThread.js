const mongoose = require('mongoose');

const MessageThreadSchema = new mongoose.Schema({ 
	id : {
		type: Number,
		required: true
	},
	users : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	messages : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	}]
});

module.exports = mongoose.model('MessageThread', MessageThreadSchema);