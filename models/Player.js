const moment = require ("moment");

class Player {

    static get GROWTH () {
        return .1;
    }

    static get GROWTH_INTERVAL () {
        return 1000 * 1; // 1 second
    }

    constructor (id, name, x, y, color = "#FFF", size = 1, rotation = 0) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.rotation = rotation;
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
        this.rotatation += deg;
    }

    move (x, y) {
        // TODO: check, that user can only move in it's range and not jumping to anywhere else!
    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
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

    changeColor (color) {
        this.color = color;
    }

    changeName (name) {
        this.name = name;
    }

}

module.exports = Player;