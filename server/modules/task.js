'use strict';

const express = require('express');
const cors = require('cors');
const pool = require('../db');

async function getAllTasks(req, res, next) {
  try {
    const query = {
      text: 'SELECT * FROM task ORDER BY created_at DESC',
    }
    const allTasks = await pool.query(query);
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
};

async function getSingleTask(req, res, next) {
  res.send('Got a single task.');
};

async function createTask(req, res, next) {
  const {title, content, point_value} = req.body;
  const query = {
    text: 'INSERT INTO task(title, content, point_value) VALUES($1, $2, $3) RETURNING *',
    values: [
      title,
      content,
      point_value,
    ],
  }
  const newTask = await pool.query(query);
  res.json(newTask.rows[0]);
};

async function updateTask(req, res, next) {
  res.send('Updated a task.');
};

async function deleteTask(req, res, next) {
  res.send('Deleted a task.');
};

module.exports = {
  getAllTasks: getAllTasks,
  getSingleTask: getSingleTask,
  createTask: createTask,
  updateTask: updateTask,
  deleteTask: deleteTask,
}