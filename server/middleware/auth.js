const Promise = require('bluebird');
const Sessions = require('../models/session.js');
const Model = require('../models/model.js');

const createSession = (req, res, next) => {

  Promise.resolve(req.cookies.shortlyid)
    .then(hash => {
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
      return Sessions.create()
        .then(results => {
          return Sessions.get({ id: results.insertId });
        })
        .tap(session => {
          res.cookie('userId_db', session.hash);
        });
    })
    .then(session => {
      req.session = session;
      next();
    });
  };

  const verifySession = (req, res, next) => {
    if (!Sessions.isLoggedIn(req.session)) {
      console.log('Message from verifySession: user not signed in')
      // res.redirect('/login');
    } else {
      next();
    }
  };

  module.exports = createSession;
  module.exports = verifySession;