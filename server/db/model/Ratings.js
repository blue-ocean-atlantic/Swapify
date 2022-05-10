const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({},{strict: false});

const ratingSchema = new mongoose.Schema({
  rating_id: {
    type: Number,
    index: true,
    required: [true, 'please provide rating_id'],
  },
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    required: true
  },
  rated_by: { //references user_id
    type: Number,
    required: true
  },
  rated_for: { //references user_id
    type: Number,
    required: true
  },
  comment: {
    type: String
  },
  listing_id: {
    type: Number,
    required: true
  }
});
ratingSchema.index({ rating_id: 1 });

module.exports = mongoose.model('ratings', tempSchema);
