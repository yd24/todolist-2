'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const taskMethods = require('./modules/task');
const rewardMethods = require('./modules/reward');
const pointMethods = require('./modules/points');

//Task Routes//
app.get('/task', taskMethods.getAllTasks);
app.get('/task/:id', taskMethods.getSingleTask);
app.post('/task', taskMethods.createTask);
app.put('/task/:id', taskMethods.updateTask);
app.delete('/task/:id', taskMethods.deleteTask);

//Reward Routes//
app.get('/reward', rewardMethods.getAllRewards);
app.get('/reward/:id', rewardMethods.getReward);
app.post('/reward', rewardMethods.createReward);
app.put('/reward/:id', rewardMethods.updateReward);
app.delete('/reward/:id', rewardMethods.deleteReward);

//Routes for tracking points//
app.delete('/points', pointMethods.removePointsToReward);
app.post('/points', pointMethods.addPointsToReward);
app.get('/points/:id', pointMethods.getCurrentPoints);

//Test server response
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