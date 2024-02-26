'use strict';

const express = require('express');
const cors = require('cors');
const pool = require('../db');

async function getAllRewards(req, res, next) {
  try {
    const query = {
      text: 'SELECT * FROM reward ORDER BY rewardID DESC',
    };
    const allRewards = await pool.query(query);
    res.json(allRewards.rows);
  } catch (err) {
    console.error(err.message);
  }
}

async function getReward(req, res, next) {
  try {
    const query = {
      text: 'SELECT * FROM reward WHERE rewardID = $1',
      values: [req.params.id],
    };
    const reward = await pool.query(query);
    res.json(reward.rows[0]);
  } catch(err) {
    console.error(err);
  }
}

async function createReward(req, res, next) {
  try {
    const {total_points, item} = req.body;
    const query = {
      text: 'INSERT INTO reward(total_points, item) VALUES($1, $2) RETURNING *',
      values: [total_points, item],
    };
    const createdReward = await pool.query(query);
    res.json(createdReward.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

async function updateReward(req, res, next) {
  try {
    const {total_points, item} = req.body;
    const query = {
      text: 'UPDATE reward SET total_points = $1, item = $2 WHERE rewardID = $3 RETURNING *',
      values: [total_points, item, req.params.id],
    };
    const updatedReward = await pool.query(query);
    res.json(updatedReward.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

async function deleteReward(req, res, next) {
  try {
    const query = {
      text: 'DELETE FROM reward WHERE rewardID = $1 RETURNING *',
      values: [req.params.id],
    };
    const deletedReward = await pool.query(query);
    res.json(deletedReward.rows[0]);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllRewards: getAllRewards,
  getReward: getReward,
  createReward: createReward,
  updateReward: updateReward,
  deleteReward: deleteReward,
};