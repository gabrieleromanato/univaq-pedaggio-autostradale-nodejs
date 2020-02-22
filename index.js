'use strict';

const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const routes = require('./routes');
const apiRoutes = require('./routes/api');
const { session, paypal } = require('./config');


app.set('view engine', 'ejs');

app.locals.paypal = paypal;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieSession(session));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/api', apiRoutes);


app.listen(port);