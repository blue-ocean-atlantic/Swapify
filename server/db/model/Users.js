const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({},{strict: false});

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    index: true,
    required: [true, 'please provide user_id'],
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    minLength: 5,
    maxLength: 5,
    required: true
    // type: Number,
    // min: 501,
    // max: 99950,
  },
  email: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  photo_url: {
    type: String
  },
});
userSchema.index({ user_id: 1 });

module.exports = mongoose.model('users', tempSchema);