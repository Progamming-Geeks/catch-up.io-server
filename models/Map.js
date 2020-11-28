const Object = require ("./Object");
const Player = require ("./Player");
const ObjectTypeInterface = require ("./ObjectTypeInterface");
const moment = require ("moment");

class Map {

    constructor (width, height, updateMapEvent) {
        this.width = width;
        this.height = height;
        this.obstacles = [];
        this.players = [];
        this.seeker = null;
        this._seekerTimeout = moment ();


        this._updateMapEvent = updateMapEvent;

        setInterval (() => {
            console.log (this.players.length);
            console.log (this.players.map (p => p.id), this.seeker ? this.seeker.id : null);
        }, 5000);
    }

    get State () {
        return {
            width: this.width,
            height: this.height,
            obstacles: this.obstacles.map (obstacle => obstacle.State),
            ...this.PlayerState,
        };
    }

    get PlayerState () {
        return {
            players: this.players.map (player => player.State),
            seeker: this.seeker ? this.seeker.State : null,
        }
    }

    generateObstacles () {
        const testBox1 = new Object(10,10,15,20, ObjectTypeInterface.Box);
        this.addObstacle(testBox1);
        const testBox2 = new Object(15,15,15,20, ObjectTypeInterface.Box);
        const testBox3 = new Object(5,5,15,20, ObjectTypeInterface.Box);
        const testBox4 = new Object(60,80,45,100, ObjectTypeInterface.Box);
        this.addObstacle(testBox2);
        this.addObstacle(testBox3);
        this.addObstacle(testBox4);
        for(let i=0; i< 10; i++){
            let x = Math.floor(Math.random()*2000+1);
            let y = Math.floor(Math.random()*2000+1);
            let height = Math.floor(Math.random()*200+1);
            let width = Math.floor(Math.random()*150+1);
            const testBox = new Object (x,y,width,height, ObjectTypeInterface.Box);
            this.addObstacle (testBox);
        }
    }

    addObstacle (object) {
        let objectRight = object.x + object.width;
        let objectBottom = object.y + object.height;
        //check that not already an object is placed on this positon or is overlapping here
        for(let mapObstacle of this.obstacles){
            let mapObstacleRight = mapObstacle.x + mapObstacle.width;
            let mapObstacleBottom = mapObstacle.y + mapObstacle.height;
            if(object.x >= mapObstacle.x && object.y >= mapObstacle.y &&  object.x <= mapObstacleRight && object.y <= mapObstacleBottom){
                return false;
            }
            if(mapObstacle.x >= object.x && mapObstacle.y >= object.y &&  mapObstacle.x <= objectRight && mapObstacle.y <= objectBottom){
                return false;
            }
        }
        //check that obstacles are within map
        if(object.x < 0){
            object.x = 0;
        }
        if(object.y < 0){
            object.y = 0;
        }
        if(objectRight > this.width){
            object.width = this.width - object.x;
        }
        if(objectBottom > this.height){
            object.height = this.height - object.y;
        }
        this.obstacles.push (object);
        return true;
    }

    addPlayer (player, randomPosition = true) {
        // if no other player on map, this player get's seeker
        if (!this.seeker){
            this.seeker = player;
        }

        // TODO: enable again!
        // check, that no player with same color is already on this map!
        // for(let p of this.players){
        //     if(p.color === player.color){
        //         console.log("Choose other color!")
        //         return false;
        //     }
        //     if(p.name === player.name){
        //         console.log("Choose other name!")
        //         return false;
        //     }
        // }

        if (randomPosition) {
            // generate random position where it makes sence to put a new player to
            while (true) {
                let obstacleCollision = false;
                let randomX = Math.floor((Math.random()*this.width)+1);
                let randomY = Math.floor((Math.random()*this.width)+1);
                for(let mapObstacle of this.obstacles){
                    let mapObstacleRight = mapObstacle.x + mapObstacle.width;
                    let mapObstacleBottom = mapObstacle.y + mapObstacle.height;
                    if (randomX >= mapObstacle.x && randomY >= mapObstacle.y && randomX <= mapObstacleRight && randomY <= mapObstacleBottom){
                        obstacleCollision = true;
                        break;
                    }
                }
                if(!obstacleCollision){
                    player.setPosition (randomX, randomY);
                    this.players.push (player);
                    return true;
                }
            }
        }
    }

    removePlayer (player) {
        // remove player, if he is part of the map
        const idx = this.players.indexOf(player);
        if (idx < 0) {
            return;
        }        
        this.players.splice(idx, 1);

        //if player is seeker, choose a random other seeker!
        if((!this.seeker || this.seeker.id === player.id) && this.players.length > 0){
            this.seeker = this.players [0];
        }
    }

    checkCollision () {
        // Check if any seeker available
        if (!this.seeker) {
            return;
        }

        // Check if timeout not over
        if (this._seekerTimeout.isAfter (moment ().subtract (5, "seconds"))) {
            return;
        }

        console.log ("CHECK_CATCH");

        // Check if seeker touches any other player
        for (const player of this.players) {
            // x-----x
            // |-----| 
            // |-----| 
            // x-----x

            // Check if x is in range of player
            if (this.seeker.x * this.seeker.PlayerSize >= player.x && this.seeker.x <= player.x + player.PlayerSize) {
                // Check if y is in range of player
                if (this.seeker.y * this.seeker.PlayerSize >= player.y && this.seeker.y <= player.y + player.PlayerSize) {
                    this.seeker = player;
                    this._updateMapEvent ();
                    this._seekerTimeout = moment ();
                    console.log ("CATCH FOUND!-------");
                    return;
                }
            }
        }
    }

}

module.exports = Map;