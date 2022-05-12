/* === External Modules === */
const express = require('express');
const path = require('path');

// const db = require('/Users/wendyzhang/HR_RFC2202/blueocean/blue-ocean/server/db/index.js');

require('dotenv').config();

const Users = require('./models/user.js');
const Sessions = require('./models/session.js');
const Model = require('./models/model.js');

const CreateSession = require('./middleware/auth');
const CookiesParser = require('./middleware/cookieParser');

const http = require('http');
// const socketio = require('socket.io');
const cors = require('cors');
const bp = require('body-parser');

/* === Internal Modules === */
const { Message, ChatLogin } = require('../database/messagesDB.js')
/* === ImageKit authentication === */
const ImageKit = require('imagekit');

/* === Server Configuration === */
const PORT = process.env.PORT || 3000;

/* === Instanced Modules === */
const app = express();
const server = http.createServer(app);
// const io = socketio(server);

/* === Middleware === */
app.use(express.json());

app.use(CookiesParser);
app.use(CreateSession);

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());


// serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));


/* === Authentication Routes === */
app.post('/login', async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log('post login req', req.body.username)
  return await Users.get({ username })
    .then(result => {
      // console.log('result at post login', result)
      if (!result.length || !Users.compare(password, result[0].password, result[0].salt)) {
        throw new Error('UserName and password do not match');
      } else {
        res.cookie("userName", username)
        res.send(result[0].username);
      }
    })
    .catch(error => {
      console.log('hi error', error);
      res.redirect(308, '/')
    })

});

app.post('/signup', (req, res, next) => {
  var firstName = req.body.values.firstName;
  var lastName = req.body.values.lastName;
  var email = req.body.values.email;
  var zipCode = req.body.values.zipCode;
  var username = req.body.values.username;
  var password = req.body.values.password;

  return Users.get({ username, email })
    .then(result => {
      if (result[0]) {
        // console.log('result', result)
        // console.log('email or username already exists')
        res.write('fail')
        res.end()
      } else {
        Users.create({ firstName, lastName, email, zipCode, username, password })
          .then(result => {
            // console.log('profile created successfully')
            res.write('success');
            res.end();
          })
          .catch(error => {
            console.log('errpr at catch', error);
          })
      }
    })
    .catch(error => {
      console.log('error caught', error);
      res.send('error at duplicate email')
    })
});

app.get('/test', (req, res, next) => {
  if (req.cookies.userName === '') {
    res.sendStatus(401);
    console.log('TEST ROUTE: currently no usrename');
  }
  console.log('TEST ROUTE: current userName', req.cookies.userName);
})

// app.get('/', (req, res, next) => {
//   if(req.cookies.userName === '') {
//     res.send('currently not loggedin')
//     // console.log('no cookies');
//   } else
//   {console.log('currently loggedin');
//   res.send('currently loggedin')}
// })

app.get('/logout', (req, res, next) => {
  res.clearCookie('userName');
  next();
});
/* === Routes === */

/* === API Routes === */


// serve react frontend
// optional but i suggest doing so to ensure consistent result
app.get('/userLists', (req, res) => {
  const { userName } = req.query;
  Message.find({ $or: [{ fromUser: userName }, { toUser: userName }] }).then(data => {
    res.send(data)
  })
})

app.get('/getChatInfo', (req, res) => {
  const { userName, toUser } = req.query;
  //console.log(toUser, userName)
  Message.find({ $or: [{ fromUser: userName, toUser }, { fromUser: toUser, toUser: userName }] }).then(data => {
    res.send(data)
  })
})

//socket
// io.on('connection', socket => {
//   // console.log(`${socket.id} connected`)
//   socket.emit('success', `${socket.id} connected`)
//   socket.on('disconnect', () => {
//     io.emit('quit', `${socket.id} disconnected`)
//   })

//   socket.on('login', (userInfo) => {
//     const socketId = userInfo.userId;
//     const { createAt, userName } = userInfo
//     ChatLogin.findOneAndUpdate({ userName }, { socketId, createAt }).then(data => {
//       if (!data) {
//         let chatlogin = new ChatLogin({ userName, socketId, createAt })
//         chatlogin.save().then(() => { })
//       }
//     })

//     socket.emit('login', `${socket.id} logged in`)
//   })

//   socket.on('sendMessage', ({ message, toUserName, createAt, userName }) => {
//     let msg = new Message({
//       fromUser: userName,
//       toUser: toUserName,
//       message,
//       createAt
//     })
//     msg.save().then(() => { })
//     ChatLogin.findOne({ userName: toUserName }).then(data => {
//       // console.log(data)
//       const toUserId = data.socketId;
//       socket.to(toUserId).emit('receiveMessage', { createAt, message, userName })
//       //console.log({ message, toUserId, toUserName, createAt, userName })
//     })
//   })
// })



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
