/* === External Modules === */
const express = require('express');
const path = require('path');
const cors = require('cors');
const bp = require('body-parser');

require('dotenv').config();

/* === ImageKit authentication === */
const ImageKit = require('imagekit');
// const fs = require('fs');

/* === Server Configuration === */
const PORT = process.env.PORT || 3000;

/* === Instanced Modules === */
const app = express();

/* === Middleware === */
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

// serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

/* === API Routes === */

app.get('/api/imagekit', (req, res) => {
  // Look into if this needs to have additional measures for security.
  // i.e. send only if source of request is our website?

  const imagekit = new ImageKit({
    publicKey: 'public_FMjtxsWyzDWFsDCkU+3LPha1J2E=',
    privateKey: process.env.IMGKIT_PRIVATE_KEY,
    urlEndpoint: 'https://ik.imagekit.io/joshandromidas/',
  });

  const authenticationParameters = imagekit.getAuthenticationParameters();

  res.json(authenticationParameters);
});

/* === Page Routes === */

// serve react frontend
app.get('*', (req, res) => {
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
app.listen(PORT, () => {
  console.log(`Server is live at localhost:${PORT}.`);
});
