const app = require('express') ();
const http = require('http').createServer (app);
const io = require('socket.io') (http, {
    cors: {
        // origin: '*',
        origin: 'http://localhost:55799',
    },
});
const Map = require ("./models/Map");
const Player = require ("./models/Player");

const emitUpdateEvent = () => {
    io.sockets.emit ('map-updated', map.State);
};
console.log ("TEST");
// Generate Map
const map = new Map (2000, 2000, emitUpdateEvent);
map.generateObstacles ();


const players = [];

// Send game-data to all players in a specific interval
setInterval (() => {
    emitUpdateEvent ();
}, 15000);

io.on("connection", (socket) => {
    console.log ('a user connected');

    // Update player-data
    socket.on("update-color", (data) => {
        console.log ("update-color", data);
        player.changeColor (data.color);
        // Send name-change to everyone
        io.sockets.emit ('player-updated', player.State);
    });
    socket.on("update-name", (data) => {
        console.log ("update-name", data);
        player.changeName (data.name);
        // Send name-change to everyone
        io.sockets.emit ('player-updated', player.State);
    });

    // Enter/Leave game
    const playerLeaved = () => {
        map.removePlayer (player);
        io.sockets.emit ('player-leaved', player.State);
    }
    socket.on ("leave-game", (data) => {
        console.log ("leave-game", data);
        playerLeaved ();
    });
    socket.on ("start-game", (data) => {
        console.log ("start-game", data);
        map.addPlayer (player);

        // Send map-data to the player
        emitUpdateEvent ();
        // Update player-position and co.
        io.sockets.emit ('player-updated', player.State);
    });

    // Game states
    // - move
    socket.on ("move-player", (data) => {
        player.move (data.x, data.y);
        map.checkCollision ();
        io.sockets.emit ('player-updated', player.State);
    });

    // - rotate
    socket.on ("rotate-player", (data) => {
        player.move (data.rotation);
        io.sockets.emit ('player-updated', player.State);
    });

    // - shrink / grow
    const sizeEvent = () => {
        io.sockets.emit ('player-updated', player.State);
    };

    // Add new player to server
    const player = new Player (socket.id, `Warrior-${players.length+1}`, 0, 0, '#'+Math.random().toString(16).substr(2,6), 1, 0, sizeEvent);
    players.push (player);

    socket.on("disconnect", () => {
        console.log ('user disconnected');
        playerLeaved ();

        // Remove player from list and destroy it
        players.splice(players.indexOf(player), 1);
        player.destroy ();
        delete player;
    });
});

http.listen(8080, () => {
    console.log('listening on *:8080');
});