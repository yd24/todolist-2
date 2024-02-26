CREATE DATABASE todo;

CREATE TABLE IF NOT EXISTS task (
  taskID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL,
  is_complete BOOL DEFAULT FALSE,
  point_value INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS reward (
  rewardID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  total_points INT NOT NULL,
  item VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS task_reward (
  taskID INT REFERENCES task (taskID) ON UPDATE CASCADE,
  rewardID INT REFERENCES reward (rewardID) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT task_reward_pkey PRIMARY KEY (taskID, rewardID)
);
