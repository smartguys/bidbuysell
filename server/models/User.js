const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const statesArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
const statusArray = ["firstTime", "active", "suspended", "appealing", "disabled"];

const UserSchema = new mongoose.Schema({
  firstName: {
      type: String,
      default: ''
  },
  lastName: {
      type: String,
      default: ''
  },
  address: {
    street: String,
    city: String,
    state: {
        type: String,
        uppercase: true,
        // required: true,
        enum: statesArray
    },
    zip: Number
  },
  userName: {
    type: String,
    default: ''
  },
  email: {
      type: String,
      default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  password: {
      type: String,
      default: ''
  },
  creditCard: {
    type: String,
    default: ''
  },
  status: {
      type: String,
      enum: statusArray
      default: 'firstTime'
  },
  isVip: {
    type: Boolean,
    default: false
  }, 
  isAdmin: {
    type: Boolean,
    default: false
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  complaintCount: {
    type: Number,
    default: 0
  },
  totalMoneySpent: {
    type: Number,
    default:  0
  },
  rating: {
    type: Number,
    default: 5
  }
});


UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User', UserSchema);
