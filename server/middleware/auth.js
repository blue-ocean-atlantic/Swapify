const Promise = require('bluebird');
const models = require('../models');

module.exports.createSession = (req, res, next) => {

  Promise.resolve(req.cookies.shortlyid)
    .then(hash => {
      if (!hash) {
        throw hash;
      }
      return models.Sessions.get({ hash });
    })
    .tap(session => {
      if (!session) {
        throw session;
      }
    })
    // initializes a new session
    .catch(() => {
      return models.Sessions.create()
        .then(results => {
          return models.Sessions.get({ id: results.insertId });
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

  module.exports.verifySession = (req, res, next) => {
    if (!models.Sessions.isLoggedIn(req.session)) {
      res.redirect('/login');
    } else {
      next();
    }
  };
