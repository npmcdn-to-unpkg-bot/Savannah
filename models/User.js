var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  password: String,
  provider_id: {
    type: String,
    unique: true
  },
  photo: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.validPassword = (password) => {
  if (password == this.password) {
    return true;
  } else {
    return false;
  }
};

var User = mongoose.model('User', userSchema, 'Users');
