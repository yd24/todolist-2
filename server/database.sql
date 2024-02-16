CREATE DATABASE todo;

CREATE TABLE IF NOT EXISTS task (
  taskID SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL,
  is_complete BOOL DEFAULT FALSE,
  point_value INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);