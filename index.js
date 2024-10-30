/* index.js */

// Init nodemon
console.log("Nodemon is running!");

// Init express
const express = require('express');
const app = express();
const PORT = 3000;

// Init livereload
const livereload = require('connect-livereload');
app.use(livereload());

// Serve static files in public
app.use(express.static('public'));

// Define index route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Define route /game
app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/public/game.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});