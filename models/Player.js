const moment = require ("moment");

class Player {

    static get GROWTH () {
        return .1;
    }

    static get GROWTH_INTERVAL () {
        return 1000 * 1; // 1 second
    }

    constructor (id, name, x, y, color = "#FFF", size = 1, rotation = 0, sizeEvent) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.rotation = rotation;
        this._sizeEvent = sizeEvent;
        this._lastMoved = moment ();

        // Start interval for calculating size
        setInterval (this._checkSize, Player.GROWTH_INTERVAL);
    }

    get State () {
        return {
            id: this.id,
            name: this.name,
            x: this.x,
            y: this.y,
            color: this.color,
            size: this.size,
            rotation: this.rotation,
        };
    }

    rotate (deg) {
        this.rotatation = deg;
    }

    move (x, y) {
        // TODO: check, that user can only move in it's range and not jumping to anywhere else!
        if(Math.abs(x) < 20 && Math.abs(y) < 20){
            this.x += x;
            this.y +=y;
        }

    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }

    grow () {
        this.size += Player.GROWTH;
        if (this._sizeEvent) {
            this._sizeEvent ();
        }
    }

    shrink () {
        this.size -= Player.GROWTH;
        if (this._sizeEvent) {
            this._sizeEvent ();
        }
    }

    _checkSize () {
        // TODO: check if player did not move for too long and grow, shrink or do nothing!
        let current = moment();
        if(current.diff(this._lastMoved,"seconds") > 2){
            this.grow();
        }
        if(current.diff(this._lastMoved,"seconds") < 1){
            this.shrink();
        }
    }

    changeColor (color) {
        this.color = color;
    }

    changeName (name) {
        this.name = name;
    }

}

module.exports = Player;