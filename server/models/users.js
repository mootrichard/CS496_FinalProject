const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  'id': String,
  'oauthId': String,
  'first_name': String,
  'last_name': String,
  'username': {
    type: String,
    unique: true
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
