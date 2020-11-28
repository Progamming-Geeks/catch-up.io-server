const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Map = require ("./models/Map");
const Player = require ("./models/Player");

// Generate Map
const map = new Map ();
map.generateObstacles ();

const players = [];

io.on('connection', (socket) => {
    const player = new Player (socket.id, `Warrior${players.length+1}`, 0, 0, "#FFF", 1, 0);
    players.push (player);
    
    console.log('a user connected');

    // Update player-data
    socket.on("update-color", (data) => {
        console.log("update-color", data);
        player.changeColor (data.color);
    });
    socket.on("update-name", (data) => {
        console.log("update-name", data);
        player.changeName (data.name);
    });

    // Enter/Leave game
    socket.on("disconnect", () => {
        console.log('user disconnected');
        map.removePlayer (player);
    });
    socket.on ("leave-game", (data) => {
        console.log("leave-game", data);
        map.removePlayer (player);
    });
    socket.on ("start-game", (data) => {
        console.log("start-game", data);
        map.addPlayer (player);
    });

    // Game states
});

http.listen(8080, () => {
    console.log('listening on *:8080');
});

// TODO: socket.io
// receive player states/movements

// send map states to players


// TODO: 
// - save state
// - client communication
// - handle players