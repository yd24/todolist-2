'use strict';

const express = require('express');
const cors = require('cors');
const pool = require('../db');

async function getAllTasks(req, res, next) {
  res.send('Got all tasks.');
};

async function getSingleTask(req, res, next) {
  res.send('Got a single task.');
};

async function createTask(req, res, next) {
  res.send('Created a task.');
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