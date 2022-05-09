/* === External Modules === */
const express = require('express');
const path = require('path');

require('dotenv').config();

/* === Internal Modules === */
// const { Pokemon } = require("../database");

/* === Server Configuration === */
const PORT = process.env.PORT || 3000;

/* === Instanced Modules === */
const app = express();

/* === Middleware === */
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

/* === Routes === */

// serve react frontend
app.get('*', function (req, res) {
  if (req.path.endsWith('bundle.js')) {
    res.sendFile(
      path.resolve(path.join(__dirname, '../client/dist'), 'bundle.js')
    );
  } else {
    res.sendFile(
      path.resolve(path.join(__dirname, '../client/dist'), 'index.html')
    );
  }
});

/* === Server Listener === */
app.listen(PORT, function () {
  console.log(`Server is live at localhost:${PORT}.`);
});
