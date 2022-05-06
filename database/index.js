const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pokedex");

mongoose.connection.once("connected", function(){
  console.log("Mongodb Connected");
});

mongoose.connection.on("error", function(err){
  console.log("Mongodb Error", err);
});

module.exports = {
  Pokemon: require("./models/Pokemon")
}