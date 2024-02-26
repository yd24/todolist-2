'use strict';

const express = require('express');
const cors = require('cors');
const pool = require('../db');

async function addPointsToReward(req, res, next) {
  try {
    const {taskID, rewardID} = req.body;
    const query = {
      text: 'INSERT INTO task_reward VALUES($1, $2)',
      values: [taskID, rewardID],
    }
    await pool.query(query);
    res.send('Points added successfully.');
  } catch(err) {
    console.error(err);
  }
}

async function removePointsToReward(req, res, next) {
  try {
    const {taskID, rewardID} = req.body;
    const query = {
      text: 'DELETE FROM task_reward WHERE taskID = $1 AND rewardID = $2',
      values: [taskID, rewardID],
    }
    await pool.query(query);
    res.json('Success.');
  } catch(err) {
    console.error(err);
  }
}

async function getCurrentPoints(req, res, next) {
  try {
    const query = {
      text: 'SELECT SUM(t.point_value) from task_reward tr INNER JOIN task t ON t.taskID = tr.taskID WHERE tr.rewardID = $1',
      values: [req.params.id],
    }
    const currPoints = await pool.query(query);
    res.json(currPoints.rows[0]);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  addPointsToReward: addPointsToReward,
  removePointsToReward: removePointsToReward,
  getCurrentPoints: getCurrentPoints,
};