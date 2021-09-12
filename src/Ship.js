// import React from 'react';

class Ship {
    constructor(type, size, position){
        this.type = type;
        this.size = size;
        this.position = position;
        this.hits = 0;
        
        this.setPosition = this.setPosition.bind(this);
        this.hit = this.hit.bind(this);
    }
    setPosition(arr) {
        this.position = arr;
    }
    hit() {
        var hits = this.hits;
        hits++;
        this.hits = hits;
    }
    isSunk() {
        if(this.hits == this.size) {
            return true;
        }
    }
}

export default Ship;