const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blueocean', { useNewUrlParser: true }, { useUnifiedTopology: true });

require('dotenv').config();

const db_host = process.env.DB_HOST || 'localhost';
const db_name = process.env.DB_NAME || 'blue_ocean_db';

mongoose.connect(`mongodb://${db_host}/${db_name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

module.exports = db;