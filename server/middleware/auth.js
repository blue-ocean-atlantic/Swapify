// const Promise = require('bluebird');
const Sessions = require('../models/session.js');
const Model = require('../models/model.js');
const utils = require('../lib/hashUtils');

const createSession = (req, res, next) => {
  let data = utils.createRandom32String();
  let hash = utils.createHash(data);

  if (!req.cookies ) {
    // req.session = {'user_id': hash};
    req.cookies = {'user_id': hash, 'userName': 'w'};
    next();
  }
  else if (req.cookies && req.cookies.userName) {
   next();
  }
  else if (!req.cookies.userName) {
      // console.log('no session')
      req.session = {'user_id': hash};
      req.cookies.userName = req.body.userName;
      req.cookies.user_id = hash;
    }
    next();

  console.log('req after ', req.session);
  // console.log('req after ', req.body);
  console.log('req cookie after ', req.cookies);
};

module.exports = createSession;
