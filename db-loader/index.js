const listingsData = require('./listings_mock_data.json');
const chatroomData = require('./chatroom_mock_data.json');
const chatMessages = require('./chat_messages_mock.json');
const ratingsData = require('./rating_mock_data.json');
const usersData = require('./users_mock_data.json');
const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/BlueOceanDummy';

mongoose.connect(url, {autoIndex: false}, () => {
  console.log('Database connected!')


}, e => console.log('error: ',e))


let schema = new mongoose.Schema({},{strict: false});

const Listings = mongoose.model('listings', schema);
const Chatroom = mongoose.model('chats', schema);
const Messages = mongoose.model('chats_messages', schema);
const Ratings = mongoose.model('ratings', schema);
const Users = mongoose.model('users', schema);


async function addDummyData () {
  try {
    await Listings.remove({});
    await Chatroom.remove({});
    await Messages.remove({});
    await Ratings.remove({});
    await Users.remove({});

    await Listings.insertMany(listingsData);
    await Chatroom.insertMany(chatroomData);
    await Messages.insertMany(chatMessages);
    await Ratings.insertMany(ratingsData);
    await Users.insertMany(usersData);
    console.log('data loading complete!');
    process.exit();
  } catch (err) {
    console.log('something broke while loading data', err.message);
  }
}

addDummyData();
