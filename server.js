const app = require('express') ();
const http = require('http').createServer (app);
const io = require('socket.io') (http);
const Map = require ("./models/Map");
const Player = require ("./models/Player");

// Generate Map
const map = new Map ();
map.generateObstacles ();

const players = [];

// Send game-data to all players in a specific interval
setInterval (() => {
    io.sockets.emit ('map-updated', map.State);
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
    socket.on("disconnect", () => {
        console.log ('user disconnected');
        playerLeaved ();
    });
    socket.on ("leave-game", (data) => {
        console.log ("leave-game", data);
        playerLeaved ();
    });
    socket.on ("start-game", (data) => {
        console.log ("start-game", data);
        map.addPlayer (player);

        // Send map-data to the player
        socket.emit ("map-updated", map.State);
        // Update player-position and co.
        io.sockets.emit ('player-updated', player.State);
    });

    // Game states
    // - move
    socket.on ("move-player", (data) => {
        player.move (data.x, data.y);
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
    const player = new Player (socket.id, `Warrior-${players.length+1}`, 0, 0, "#FFF", 1, 0, sizeEvent);
    players.push (player);
});

http.listen(8080, () => {
    console.log('listening on *:8080');
});