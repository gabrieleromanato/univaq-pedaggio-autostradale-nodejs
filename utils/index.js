'use strict';

const mongo = require('mongodb').MongoClient;
const { database } = require('../config');

module.exports = {
    async db() {
        try {
           const client = await mongo.connect(database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          return client;
        } catch(err) {
            return err;
        }
    }
};