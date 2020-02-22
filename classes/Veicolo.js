'use strict';

class Veicolo {
    constructor(modello, marca, anno, targa, assi, peso, altezza, classe, classeAmbientale) {
        this.modello = modello;
        this.marca = marca;
        this.anno = anno;
        this.targa = targa;
        this.assi = assi;
        this.peso = peso;
        this.altezza = altezza;
        this.classe = classe;
        this.classeAmbientale = classeAmbientale;
    }
}

module.exports = Veicolo;