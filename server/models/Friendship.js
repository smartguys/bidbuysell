const mongoose = require('mongoose');

const FriendshipSchema = new mongoose.Schema({
	user1 : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	user2 : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	isDelete : {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Friendship', FriendshipSchema);