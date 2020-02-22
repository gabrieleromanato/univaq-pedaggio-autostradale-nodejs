'use strict';

const express = require('express');
const validator = require('validator');
const router = express.Router();
const { db } = require('../utils');
const { name } = require('../config').database;
const { Veicolo, Casello, PedaggioFactory, Percorso } = require('../classes');


router.get('/caselli', async (req, res, next) => {
    try {
        const { term } = req.query;
        const client = await db();
        const database = client.db(name);
        const collection = database.collection('caselli');
        const results = await collection.find({ nome: { $regex: term, $options: 'i' } } ).toArray();
        res.json({ results });
    } catch(err) {
        res.sendStatus(500);
    }
});

router.post('/calculate', (req, res, next) => {
    const { start, arrival, model, brand, plate, year, axles, weight, height, class_veic, class_env } = req.body;
    const errors = [];

    if(validator.isEmpty(start)) {
        errors.push({ start: 'Valore non valido.' });
    }
    if(validator.isEmpty(arrival)) {
        errors.push({ arrival: 'Valore non valido.' });
    }
    if(validator.isEmpty(model)) {
        errors.push({ model: 'Valore non valido.' });
    }
    if(validator.isEmpty(brand)) {
        errors.push({ brand: 'Valore non valido.' });
    }
    if(validator.isEmpty(plate)) {
        errors.push({ plate: 'Valore non valido.' });
    }
    if(!validator.isInt(year)) {
        errors.push({ year: 'Valore non valido.' });
    }
    if(!validator.isInt(axles)) {
        errors.push({ axles: 'Valore non valido.' });
    }
    if(!validator.isInt(weight)) {
        errors.push({ weight: 'Valore non valido.' });
    }
    if(!validator.isInt(height)) {
        errors.push({ height: 'Valore non valido.' });
    }
    if(validator.isEmpty(class_veic)) {
        errors.push({ class_veic: 'Valore non valido.' });
    }
    if(validator.isEmpty(class_env)) {
        errors.push({ class_env: 'Valore non valido.' });
    }

    if(errors.length > 0) {
        res.json({ errors });
    } else {
        const veicolo = new Veicolo(model, brand, parseInt(year, 10), plate, parseInt(axles, 10), parseInt(weight, 10), parseInt(height, 10), class_veic, class_env);
        const pedaggio = PedaggioFactory.getInstance('default', 2, 0.50, veicolo.classe, veicolo.classeAmbientale);
        const casello = new Casello(Number(start), Number(arrival));
        const percorso = new Percorso(casello.startKm, casello.endKm);

        percorso.calculateTravelKm();

        const amt = pedaggio.calculate(percorso.travelKm);
        const total = amt.toFixed(2);

        req.session.total = parseFloat(total);

        res.json({ done: true });
    }
});

module.exports = router;