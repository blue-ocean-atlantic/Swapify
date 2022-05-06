/* === External Modules === */
const express = require("express");
const path = require("path");

require("dotenv").config();

/* === Internal Modules === */
const { Pokemon } = require("../database");


/* === Server Configuration === */
const PORT = process.env.PORT;

/* === Instanced Modules === */
const app = express();

/* === Middleware === */
app.use(express.json());

// serve static files 
app.use(express.static(path.join(__dirname, "../client/dist")));

/* === Routes === */

// serve react frontend
// optional but i suggest doing so to ensure consistent result
// app.get("/", function(req,res){
//   return res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

// api routes

// index route 
app.get("/api/pokemon", function(req,res){
  Pokemon.find({}).sort("num").exec(function(err, allPokemon){
    if(err) {
      console.log(err);
      return res.status(500).json({message: "Internal Server Error"})
    }

    return res.status(200).json({
      pokemon: allPokemon,
    });

  });
});


//create 
app.post("/api/pokemon", function(req,res){
  Pokemon.create(req.body, function(err, newPokemon){
    if(err) {
      console.log(err);
      return res.status(500).json({message: "Internal Server Error"})
    }

    return res.status(200).json({
      pokemon: newPokemon,
    });

  });
});

/* === Server Listener === */
app.listen(PORT, function(){
  console.log(`Server is live at localhost:${PORT}.`);
});
