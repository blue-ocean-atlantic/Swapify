// const db = require('../db');
const _ = require('lodash');
const db = require('/Users/wendyzhang/HR_RFC2202/blueocean/blue-ocean/server/db/index.js');
const CreateUserSchema = require('/Users/wendyzhang/HR_RFC2202/blueocean/blue-ocean/server/db/models/users.js');

// const executeQuery = (query) => {
//   return queryAsync(query).spread(results => console.log('results at execute query', results));
// };

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
    let inputEmail = parseData(options).values[0];
    // console.log('fad', inputEmail);
    return CreateUserSchema.find({ 'email': inputEmail });
    // return (executeQuery(queryString).then(results => console.log('results at get', results)));
  }
  update(options, values) {
    console.log('option at update', options);
    console.log('values at update', values);
    let parsedOptions = parseData(options);
    // let queryString = `UPDATE ${this.tablename} SET ? WHERE ${parsedOptions.string.join(' AND ')}`;
    // return executeQuery(queryString, Array.prototype.concat(values, parsedOptions.values));
  }
  delete(options) {
    let parsedOptions = parseData(options);
    let queryString = `DELETE FROM ${this.tablename} WHERE ${parsedOptions.string.join(' AND ')}`;
    return executeQuery(queryString, parsedOptions.values);
  }

}

module.exports = Model;
