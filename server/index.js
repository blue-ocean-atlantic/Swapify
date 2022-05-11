/* === External Modules === */
const express = require('express');
const path = require('path');
const db = require('/Users/wendyzhang/HR_RFC2202/blueocean/blue-ocean/server/db/index.js');

require('dotenv').config();

const Users = require('./models/user.js');
const Sessions = require('./models/session.js');

const CreateSession = require('./middleware/auth');
const CookiesParser = require('./middleware/cookieParser');

/* === ImageKit authentication === */
const ImageKit = require('imagekit');
// const fs = require('fs');

/* === Server Configuration === */
const PORT = process.env.PORT || 3000;

/* === Instanced Modules === */
const app = express();

/* === Middleware === */
app.use(express.json());
// app.use(CookiesParser);
// app.use(CreateSession);

// serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

/* === Authentication Routes === */
app.post('/login', (req, res, next) => {
  // console.log('req', req.body);
  var username = req.body.userName;
  var password = req.body.password;

  return Users.get({ username })
    .then(user => {
      if (!user || !Users.compare(password, user.password, user.salt)) {
        // user doesn't exist or the password doesn't match
        throw new Error('Username and password do not match');
      }
      return Sessions.update({ hash: req.session.hash }, { userId: user.id });
    })
    .then(() => {
      res.redirect('/');
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(() => {
      res.redirect('/login');
    });
});

app.post('/signup', (req, res, next) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var zipCode = req.body.zipCode;
  var username = req.body.userName;
  var password = req.body.password;

  Users.create({ firstName, lastName, email, zipCode, username, password })
    .then(result => {
      console.log('dfad',result);
      res.send('hello')
    })
    // .then(()=>{
    //   res.redirect('http://www.google.com');
    // })
    .catch(error => {
        console.log('errpr at catch', error);
        // res.redirect('/');
    })

  // res.redirect('/signup');
    // // .then(results => {console.log('dfasd',results)})
    // // .then(results => {
    // //   return Sessions.update({ hash: req.session.hash }, { userId: results.insertId });
    // // })
    // // .then(() => {
    // //   res.redirect('/');
    // // })
    // .error(error => {
    //   res.status(500).send(error);
    // })
    // .catch(user => {
    //   res.redirect('/signup');
    // });
});

app.get('/logout', (req, res, next) => {

  return Sessions.delete({ hash: req.cookies.shortlyid })
    .then(() => {
      res.clearCookie('shortlyid');
      res.redirect('/login');
    })
    .error(error => {
      res.status(500).send(error);
    });
});
/* === Routes === */

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
app.listen(PORT, () => {
  console.log(`Server is live at localhost:${PORT}.`);
});
