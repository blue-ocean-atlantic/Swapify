/* === External Modules === */
const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

require("dotenv").config();

/* === Internal Modules === */
// const { Pokemon } = require("../database");
const { Message, ChatLogin } = require('../database/messagesDB.js')

/* === Server Configuration === */
const PORT = process.env.PORT || 3000;

/* === Instanced Modules === */
const app = express();
const server = http.createServer(app);
const io = socketio(server);

/* === Middleware === */
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));

/* === Routes === */

// serve react frontend
// optional but i suggest doing so to ensure consistent result
app.get('/userLists', (req, res) => {
  const { userName } = req.query;
  Message.find({ $or: [{ fromUser: userName }, { toUser: userName }] }).then(data => {
    res.send(data)
  })
})

app.get('/getChatInfo', (req, res) => {
  const { toUser, userName } = req.query;
  //console.log(toUser, userName)
  Message.find({ $or: [{ fromUser: userName, toUser }, { fromUser: toUser, toUser: userName }] }).then(data => {
    res.send(data)
  })
})

app.get("*", function (req, res) {
  return res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

//socket
io.on('connection', socket => {
  socket.emit('success', `${socket.id} connected`)
  socket.on('disconnect', () => {
    io.emit('quit', `${socket.id} disconnected`)
  })

  socket.on('login', (userInfo) => {
    const socketId = userInfo.userId;
    const { createAt, userName } = userInfo
    ChatLogin.findOneAndUpdate({ userName }, { socketId, createAt }).then(data => {
      if (!data) {
        let chatlogin = new ChatLogin({ userName, socketId, createAt })
        chatlogin.save().then(() => { })
      }
    })

    socket.emit('login', `${socket.id} logged in`)
  })

  socket.on('sendMessage', ({ message, toUserName, createAt, userName }) => {
    let msg = new Message({
      fromUser: userName,
      toUser: toUserName,
      message,
      createAt
    })
    msg.save().then(() => { })
    ChatLogin.findOne({ userName: toUserName }).then(data => {
      // console.log(data)
      const toUserId = data.socketId;
      socket.to(toUserId).emit('receiveMessage', { createAt, message, userName })
      //console.log({ message, toUserId, toUserName, createAt, userName })
    })
  })
})



/* === Server Listener === */
server.listen(PORT, function () {
  console.log(`Server is live at localhost:${PORT}.`);
});
