'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//initialize pool of connections to PostgreSQL DB
const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PW,
  port: process.env.DB_PORT,
});

//testing server response
app.get('/todo', (req, res) => {
  res.send('You got the todo!');
});

app.get('*', (req, res) => {
  res.send('No resource here.');
});

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}.`);
    });
  }
}