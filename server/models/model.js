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
    let inputUsername = parseData(options).values[0];

    CreateUserSchema.find({inputUsername});
  // return (executeQuery(queryString).then(results => console.log('results at get', results)));
  }

}

module.exports = Model;
