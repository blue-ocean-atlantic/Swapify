const Promise = require('bluebird');
const Sessions = require('../models/session.js');
const Model = require('../models/model.js');

const createSession = (req, res, next) => {
//
// console.log('req',req);

  Promise.resolve(req.cookies.userId)
    .then(hash => {
      // console.log('hash', hash);
      if (!hash) {
        throw hash;
      }
      return Sessions.get({ hash });
    })
    .tap(session => {
      if (!session) {
        throw session;
      }
    })
    // initializes a new session
    .catch(() => {
      return Sessions.create() //returns sessionObj = {userID: hashed-id}
    })
    .then(session => { //takes the session obj, and attach it to cookie
      res.setHeader('user_id', session.userID);
      return session;
    })
    .then(session => {
      req.session = session;
      next();
    });
  };

  // const verifySession = (req, res, next) => {
  //   if (!Sessions.isLoggedIn(req.session)) {
  //     console.log('Message from verifySession: user not signed in')
  //     // res.redirect('/login');
  //   } else {
  //     next();
  //   }
  // };

  module.exports = createSession;
  // module.exports = verifySession;