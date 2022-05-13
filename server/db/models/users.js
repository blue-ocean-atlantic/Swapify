const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  zipCode: Number,
  password: String,
  salt: String
});

const CreateUserSchema = mongoose.model('Users', usersSchema);

module.exports = CreateUserSchema;