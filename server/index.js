/* === External Modules === */
const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const bp = require('body-parser');

require('dotenv').config();

/* === Internal Modules === */
const { Message, ChatLogin } = require('../database/messagesDB.js')
/* === ImageKit authentication === */
const ImageKit = require('imagekit');

/* === Server Configuration === */
const PORT = process.env.PORT || 3000;

/* === Instanced Modules === */
const app = express();
const server = http.createServer(app);
const io = socketio(server);

/* === Middleware === */
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

// serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

/* === API Routes === */

// serve react frontend
app.get('/userLists', (req, res) => {
  const { userName } = req.query;
  Message.find({ $or: [{ fromUser: userName }, { toUser: userName }] }).then(data => {
    res.send(data)
  })
})

app.get('/getUserProfiles', (req, res) => {
  const { userNames } = req.query;
  if (userNames) {
    ChatLogin.find({ 'userName': { $in: userNames } }).then((data) => {
      res.send(data.map(x => ({ userName: x.userName, profile: x.profile })))
    })
  } else {
    res.send([])
  }
})

app.get('/getChatInfo', (req, res) => {
  const { userName, toUser } = req.query;
  //console.log(toUser, userName)
  Message.find({ $or: [{ fromUser: userName, toUser }, { fromUser: toUser, toUser: userName }] }).then(data => {
    res.send(data)
  })
})

app.post('/addNewToUser', (req, res) => {
  const { userName, profile } = req.query
  ChatLogin.findOneAndUpdate({ userName }, { profile }).then(data => {
    if (!data) {
      let chatlogin = new ChatLogin({ userName, profile })
      chatlogin.save().then(() => { })
    }
  })
})

//socket
io.on('connection', socket => {
  // console.log(`${socket.id} connected`)
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
app.get('/api/imagekit', (req, res) => {
  // Look into if this needs to have additional measures for security.
  // i.e. send only if source of request is our website?

  const imagekit = new ImageKit({
    publicKey: 'public_FMjtxsWyzDWFsDCkU+3LPha1J2E=',
    privateKey: process.env.IMGKIT_PRIVATE_KEY,
    urlEndpoint: 'https://ik.imagekit.io/joshandromidas/',
  });

  const authenticationParameters = imagekit.getAuthenticationParameters();

  res.json(authenticationParameters);
});

/* === Page Routes === */

// serve react frontend
// optional but i suggest doing so to ensure consistent result
app.get('*', (req, res) => {
  if (req.path.endsWith('bundle.js')) {
    res.sendFile(
      path.resolve(path.join(__dirname, '../client/dist'), 'bundle.js')
    );
  } else {
    res.sendFile(
      path.resolve(path.join(__dirname, '../client/dist'), 'index.html')
    );
  }
});

/* === Server Listener === */
server.listen(PORT, () => {
  console.log(`Server is live at localhost:${PORT}.`);
});
