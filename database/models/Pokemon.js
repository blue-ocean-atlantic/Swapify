const mongoose = require("mongoose");


const PokemonSchema = new mongoose.Schema({
  num: Number,
  name: {
    type: String,
    required: [true, "You must provide a name."]
  }
});

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

module.exports = Pokemon;