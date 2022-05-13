const _ = require('lodash');
const db = require('../db/index.js');
const CreateUserSchema = require('../db/models/users.js');

const parseData = options => {
  // console.log('options', options)
  return _.reduce(options, (parsed, value, key) => {
    parsed.string.push(`${key} = ?`);
    parsed.values.push(value);
    return parsed;
  }, { string: [], values: [] });
};

class Model {
  constructor(tablename) {
    this.tablename = tablename;
  }

  get(input) {
    let userInput = parseData(input).values[0];
    if (!input.email) {
      return CreateUserSchema.find({ 'username': userInput });
    } else if (input.email) {
      var username = input.username;
      var email = input.email;
      return CreateUserSchema.find({ $or: [{ 'username': username }, { 'email': email }] })

    }
  }

}

module.exports = Model;
