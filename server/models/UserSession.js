const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  userId: {
      type: String,
      default: '-1'
  },
  token: {
      type: String,
      default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDelete: {
      type: Boolean,
      default: false
  }

});


module.exports = mongoose.model('UserSession', UserSessionSchema);
