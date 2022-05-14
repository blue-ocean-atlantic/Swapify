const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/messages');
let messageSchema = mongoose.Schema({
  fromUser: String,
  toUser: String,
  message: String,
  createAt: String,
});

let chatLoginSchema = mongoose.Schema({
  createAt: String,
  userName: String,
  socketId: String,
  profile: String,
});

let Message = mongoose.model('message', messageSchema);
let ChatLogin = mongoose.model('chatlogin', chatLoginSchema);

module.exports = {
  Message,
  ChatLogin,
};
