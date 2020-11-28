const ObjectTypeInterface = require ("./ObjectTypeInterface");

class Object {

    constructor (x, y, width, height, type = ObjectTypeInterface.ObjectTypeInterface) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    get State () {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            type: this.type,
        };
    }



}

module.exports = Object;