const TypeInterface = require ("./TypeInterface");
const moment = require ("moment");

class Player {

    static get GROWTH () {
        return .1;
    }

    static get GROWTH_INTERVAL () {
        return 1000 * 1; // 1 second
    }

    constructor (name, x, y, color, size = 1, rotation = 0, type = TypeInterface.Runaway) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.rotation = rotation;
        this.type = type;
        this._lastMoved = moment ();

        // Start interval for calculating size
        setInterval (this._checkSize, Player.GROWTH_INTERVAL);
    }

    get State () {
        return {
            name: this.name,
            x: this.x,
            y: this.y,
            color: this.color,
            size: this.size,
            rotation: this.rotation,
            type: this.type,
        };
    }

    rotate (deg) {
        this.rotatation += deg;
    }

    move (x, y) {
        // TODO: check, that user can only move in it's range and not jumping to anywhere else!
    }

    grow () {
        this.size += Player.GROWTH;
    }

    shrink () {
        this.size -= Player.GROWTH;
    }

    _checkSize () {
        // TODO: check if player did not move for too long and grow, shrink or do nothing!
    }



}

module.exports = Player;