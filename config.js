'use strict';

module.exports = {
    session: {
        name: 'session-name',
        keys: ['key1', 'key2']
    },
    database: {
        url: 'mongodb://127.0.0.1:27017',
        name: 'database-name'
    },
    paypal: {
        url: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
        email: 'your-paypal-sandbox-email',
        formId: 'XY_BuyNow_WPS_IT',
        return: 'http://localhost:3000/grazie',
        cancel: 'http://localhost:3000/annulla'
    }
};