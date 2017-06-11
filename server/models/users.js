const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  token: String,
  refreshToken: String,
  name: String,
  email: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;
