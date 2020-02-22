'use strict';

class PedaggioBase {
    constructor(tariffaUnitaria, arrotondamento, classeVeicolo) {
        this.tariffaUnitaria = tariffaUnitaria;
		this.arrotondamento = arrotondamento;
		this.classeVeicolo = classeVeicolo;
    }

    calculate(km) {
        let amount = 0;
		let amtByKm = this.tariffaUnitaria * km;
		
		amount += amtByKm;
		
		const vat = (amount * 22) / 100;
		
		amount += vat;
		
		let afterDecimal = amount - amount;
		
		if(afterDecimal > this.arrotondamento) {
			amount = amount + 1;
		} else {
			amount = amount + 0;
		}
		
		switch(this.classeVeicolo) {
			case 'A':
				amount += 1;
				break;
			case 'B':
				amount += 2;
				break;
			case '3':
				amount += 3;
				break;
			case '4':
				amount += 4;
				break;
			case '5':
				amount += 5;
				break;
			default:
				break;
		}
		
		
		
		return amount;
    }
}

module.exports = PedaggioBase;