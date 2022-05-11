const mongoose = require('mongoose');

let tempSchema = new mongoose.Schema({},{strict: false});

const chatSchema = new mongoose.Schema({
  chat_id: {
    type: Number,
    index: true,
    required: [true, 'please provide chat_id'],
  },
  receiver: { //references user_id, receiver is the starter of the chat
    type: Number,
    required: true
  },
  donor: { //references user_id
    type: Number,
    required: true
  },
  ended_time: { //is it necessary given that listing has its own end time which also functions as the time when chat ends?
    type: Date
  }
  //mongoose schemas automatically includes a createdAt timestamp which we can use for 'start time'
});
chatSchema.index({ chat_id: 1 });

const chatMessageSchema = new mongoose.Schema({
  chat_message_id: {
    type: Number,
    index: true,
    required: [true, 'please provide chat_message_id'],
  },
  chat_id: {
    type: Number,
    index: true
  },
  message: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false
  },
  read_time: {
    type: Date
  }
});
chatMessageSchema.index({ chat_message_id: 1 });

const Chats = mongoose.model('chats', tempSchema);
const ChatMessages = mongoose.model('chats_messages', tempSchema);

module.exports = {
  Chats,
  ChatMessages
};


