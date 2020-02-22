'use strict';

const express = require('express');
const router = express.Router();
const { db } = require('../utils');
const { name } = require('../config').database;

router.get('/', (req, res, next) => {
    if(!req.session.user) {
        res.render('login', {
            title: 'Login'
        });
    } else {
        const { user } = req.session;
        res.redirect(`/${user.role}`);
    }
});

router.get('/admin/:section?', async (req, res, next) => {
    if(!req.session.user) {
        res.redirect('/');
    } else {
        if(!req.params.section) {
            res.render('admin', {
                title: 'Area Amministrativa',
                section: 'admin'
            });
        } else {
            try {
                const { section } = req.params;
                const title = section[0].toUpperCase() + section.substring(1);
                const client = await db();
                const database = client.db(name);
                const collection = database.collection(section);
                const records = await collection.find().toArray();

                res.render(section, {
                    title,
                    section,
                    records
                });
            } catch(err) {
                res.sendStatus(500);
            }
        }
    }
});

router.get('/user', (req, res, next) => {
    if(!req.session.user) {
        res.redirect('/');
    } else {
        res.render('user', {
            title: 'Area Utente'
        });
    }
});

router.get('/logout', (req, res, next) => {
    if(req.session.user) {
        delete req.session.user;
    }
    res.redirect('/');
});

router.get('/pagamento', (req, res, next) => {
    if(!req.session.total) {
        res.redirect('/');
        return;
    }

    res.render('payment', {
        title: 'Pagamento',
        total: req.session.total
    });
});

router.get('/annulla', (req, res, next) => {
    res.redirect('/pagamento');
});

router.get('/grazie', (req, res, next) => {
    if(req.session.total) {
        delete req.session.total;
    }
    res.render('thank-you', {
        title: 'Grazie!'
    });
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    if(username === 'admin' && password === 'admin') {
        req.session.user = { role: 'admin' };
    }
    if(username === 'user' && password === 'user') {
        req.session.user = { role: 'user' };
    }
    res.redirect('/');
});

module.exports = router;