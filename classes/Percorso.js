'use strict';

class Percorso {
    constructor(startKm, endKm) {
        this.startKm = startKm;
        this.endKm = endKm;
        this.travelKm = 0;
    }

    calculateTravelKm() {
        if(this.endKm > this.startKm) {
            this.travelKm = this.endKm - this.startKm;
        } else {
            this.travelKm = this.startKm - this.endKm;
        }
    }
}

module.exports = Percorso;