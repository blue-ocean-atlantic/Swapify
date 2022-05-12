const _ = require('lodash');
const db = require('/Users/wendyzhang/HR_RFC2202/blueocean/blue-ocean/server/db/index.js');
const CreateUserSchema = require('/Users/wendyzhang/HR_RFC2202/blueocean/blue-ocean/server/db/models/users.js');

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

  get(options) {
    let userInput = parseData(options).values[0];
    // console.log('userinput', userInput)
    // console.log('query result', CreateUserSchema.find({ 'username': userInput }))
    // if (userInput.includes('@')) {
    //   return CreateUserSchema.find({ 'email': userInput });
    // } else {
      return CreateUserSchema.find({ 'username': userInput });
    // }
  }

  // getTwoVar(input1, input2) {
  //   let userInput1 = parseData(input1).values[0]; //username
  //   let userInput2 = parseData(input2).values[0]; //email

  //   // console.log('input12', input1, input2)
  //   return CreateUserSchema.find({'username': userInput1, 'email': userInput2})

  // }

}

module.exports = Model;
