const Object = require ("./Object");
const Player = require ("./Player");

class Map {

    constructor (width, height) {
        this.width = width;
        this.height = height;
        this.obstacles = [];
        this.players = [];
    }

    get State () {
        return {
            width: this.width,
            height: this.height,
            obstacles: this.obstacles.map (obstacle => obstacle.State),
            players: this.players.map (player => player.State),
        };
    }

    get PlayerState () {
        return {
            players: this.players.map (player => player.State),
        }
    }

    generateObstacles () {
        // TODO: generate obsacles for this map
        // use: this.addObstacke (new Object (…));
    }

    addObstacle (object) {
        // TODO: check that not already an object is placed on this positon or is overlapping here
        this.obstacles.push (object);
    }

    addPlayer (player, randomPosition = true) {
        // TODO: check, that no player with same color is already on this map!
        if (randomPosition) {
            // TODO: generate random position where it makes sence to put a new player to
            // player.setPosition ();
        }
        this.players.push (player);
    }

}

module.exports = Map;