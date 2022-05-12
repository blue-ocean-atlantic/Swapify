const utils = require('../lib/hashUtils');
const Model = require('./model');
const CreateUserSchema = require('/Users/wendyzhang/HR_RFC2202/blueocean/blue-ocean/server/db/models/users.js');
const db = require('/Users/wendyzhang/HR_RFC2202/blueocean/blue-ocean/server/db/index.js');

const parseData = options => {
  // console.log('options', options)
  return _.reduce(options, (parsed, value, key) => {
    parsed.string.push(`${key} = ?`);
    parsed.values.push(value);
    return parsed;
  }, { string: [], values: [] });
};

class Users extends Model {
  constructor() {
    super('users');
  }

  compare(attempted, password, salt) {
    return utils.compareHash(attempted, password, salt);
  }

  /**
   * Creates a new user record.
   * This method creates a salt and hashes the password before storing
   * the username, hashed password, and salt in the database.
   */
  create({ firstName, lastName, email, zipCode, username, password }) {
    let salt = utils.createRandom32String();
    let userInput = {
      firstName, lastName, email, zipCode, username,
      salt,
      password: utils.createHash(password, salt)
    };

    let newUser = new CreateUserSchema(userInput);
    return (newUser.save());
  }

}

module.exports = new Users();
