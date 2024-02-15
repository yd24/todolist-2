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

//Methods for Task//
const taskMethods = require('./modules/task');
app.get('/task', taskMethods.getAllTasks);
app.get('/task/:id', taskMethods.getSingleTask);
app.post('/task', taskMethods.createTask);
app.put('/task/:id', taskMethods.updateTask);
app.delete('/task/:id', taskMethods.deleteTask);

//Test server
app.get('*', (req, res, next) => {
  res.send('Test completed.');
});

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}.`);
    });
  }
}