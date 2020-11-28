const Object = require ("./Object");
const Player = require ("./Player");

class Map {

    constructor (width, height) {
        this.width = width;
        this.height = height;
        this.obstacles = [];
        this.players = [];
        this.seeker = null;
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
            seeker: this.seeker,
        }
    }

    generateObstacles () {
        // TODO: generate obsacles for this map
        const testBox1 = new Object(10,10,15,20);
        const testBox2 = new Object(15,15,15,20);
        const testBox3 = new Object(5,5,15,20);
        const testBox4 = new Object(60,80,45,100);
        this.addObstacle(testBox1);
        this.addObstacle(testBox2);
        this.addObstacle(testBox3);
        this.addObstacle(testBox4);
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
        if (this.players.length === 0){
            this.seeker = player;
        }
        // check, that no player with same color is already on this map!
        for(let p of this.players){
            if(p.color === player.color){
                console.log("Choose other color!")
                return false;
            }
            if(p.name === player.name){
                console.log("Choose other name!")
                return false;
            }
        }

        if (randomPosition) {
            // generate random position where it makes sence to put a new player to
            while(true){
                let obstacleCollision = false;
                let randomX = Math.floor((Math.random()*this.width)+1);
                let randomY = Math.floor((Math.random()*this.width)+1);
                for(let mapObstacle of this.obstacles){
                    let mapObstacleRight = mapObstacle.x + mapObstacle.width;
                    let mapObstacleBottom = mapObstacle.y + mapObstacle.height;
                    if(randomX >= mapObstacle.x && randomY >= mapObstacle.y &&  randomX <= mapObstacleRight && randomY <= mapObstacleBottom){
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
        // remove player
        this.players = this.players.filter(p => p.id !== player.id);
        //if player is seeker, choose a random other seeker!
        if(player.id === this.seeker.id){
            let i = Math.floor(Math.random()*this.players.length + 1);
            this.seeker = this.players[i];
        }
    }

}

module.exports = Map;