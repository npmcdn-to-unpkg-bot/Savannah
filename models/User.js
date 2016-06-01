var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  first_name: String,
  last_name: String,
  full_name: String,
  email_address: String,
  location: String,
  password: String,
  provider_id: {
    type: String,
    unique: false
  },
  photo: String,
  cart: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// NOTE: Can't use ES6 function syntax here
// because it changes the semantics of 'this'
// which would make 'this' an empty object
userSchema.methods.validPassword = function (password) {
  if (password === this.password) {
    return true;
  } else {
    return false;
  }
};

var User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
