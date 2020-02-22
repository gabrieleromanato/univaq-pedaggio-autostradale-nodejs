'use strict';

const PedaggioBase = require('./PedaggioBase');
const Pedaggio = require('./Pedaggio');

class PedaggioFactory {
    static getInstance( type, tariffaUnitaria, arrotondamento, classeVeicolo, classeAmbientale) {
        switch(type) {
            case 'default':
                return new PedaggioBase(tariffaUnitaria, arrotondamento,classeVeicolo);
            case 'tax':
                return new Pedaggio(tariffaUnitaria, arrotondamento, classeVeicolo, classeAmbientale);
            default:
                return null;
                
        }
    }
}

module.exports = PedaggioFactory;