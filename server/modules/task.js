'use strict';

const express = require('express');
const cors = require('cors');
const pool = require('../db');

async function getAllTasks(req, res, next) {
  try {
    const query = {
      text: 'SELECT * FROM task ORDER BY created_at DESC',
    };
    const allTasks = await pool.query(query);
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
};

async function getSingleTask(req, res, next) {
  try {
    const query = {
      text: 'SELECT * FROM task WHERE $1 = taskID',
      values: [req.params.id],
    };
    const singleTask = await pool.query(query);
    res.json(singleTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

async function createTask(req, res, next) {
  try {
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
  } catch (err) {
    console.error(err);
  }
};

async function updateTask(req, res, next) {
  try {
    const {title, content, point_value} = req.body;
    const query = {
      text: 'UPDATE task SET title = $1, content = $2, point_value = $3 WHERE taskID = $4 RETURNING *',
      values: [
        title,
        content,
        point_value,
        req.params.id,
      ],
    };
    const updatedTask = await pool.query(query);
    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error(err);
  }
};

//add function that completes task and adds points to rewards.

async function deleteTask(req, res, next) {
  try {
    const query = {
      text: 'DELETE FROM task WHERE taskID = $1 RETURNING *',
      values: [req.params.id],
    };
    const updatedTask = await pool.query(query);
    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllTasks: getAllTasks,
  getSingleTask: getSingleTask,
  createTask: createTask,
  updateTask: updateTask,
  deleteTask: deleteTask,
}