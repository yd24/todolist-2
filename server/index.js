'use strict';

require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 3001;

app.start(PORT);