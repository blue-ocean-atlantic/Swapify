const Promise = require('bluebird');
const Sessions = require('../models/session.js');
const Model = require('../models/model.js');
const utils = require('../lib/hashUtils');

const CreateSession = (req, res, next) => {
  let data = utils.createRandom32String();
  let hash = utils.createHash(data);
  console.log(req.cookies)

  if (!req.cookies?.userName) {
    console.log('no username in cookies')
    req.cookies = { userName: '' };
  } else {
    // console.log('userName in cookies')
    //do something with req.cookies?.userName
  }
  next();

  console.log('req cookie ', req.cookies);
};

module.exports = CreateSession;
