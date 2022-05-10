const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({},{strict: false});

const listingSchema = new mongoose.Schema({
  listing_id: {
    type: Number,
    index: true,
    required: [true, 'please provide listing_id'],
  },
  created_by: { //references user_id
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['swap', 'favor'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  available_date: {
    type: Date,
    required: true
  },
  images_urls: {
    type: [String]
  },
  zipcode: {
    type: String,
    minLength: 5,
    maxLength: 5,
    // required: true
    // type: Number,
    // min: 501,
    // max: 99950,
  },
  location: {
    type: locationSchema
  }
  ended: {
    type: Boolean,
    required: true,
    default: false
  },
  ended_time: {
    type: Date
  }
});
listingSchema.index({ listing_id: 1 });

const locationSchema = new mongoose.Schema({
  address: {
    type: String
  },
  street: {
    type: String
  },
  state: {
    type: String,
    minLength: 2,
    maxLength: 2
  },
  street: {
    type: String
  },
  zipcode: {
    type: String,
    minLength: 5,
    maxLength: 5,
    required: true
    // type: Number,
    // min: 501,
    // max: 99950,
  },
  longitute: {
    type: Number
  },
  latitude: {
    type: Number
  }
});

module.exports = mongoose.model('listings', tempSchema);
