const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('works');
});


// TODO: express

// Http-routes for generating players
app.post ('/players', (req, res) => {
    // Receive color + name
});


// TODO: socket.io
// receive player states/movements
// send map states to players

// TODO: 

// - save state
// - client communication
// - handle players

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);