import axios from "axios";
import type { Task } from "../common/Task";
import type { TaskInput } from "../common/TaskInput";

interface TaskVariables {
  input: TaskInput;
  taskID: number | null;
}

export const getTasks = async () => {
  try {
    const config = {
      method: "get",
      baseURL: import.meta.env.VITE_REACT_APP_SERVER,
      url: "/task",
    };
    const results = await axios<Task[]>(config);
    return results.data;
  } catch (e) {
    console.error(e);
  }
};

export const getUncompletedTasks = async () => {
  try {
    const config = {
      method: "get",
      baseURL: import.meta.env.VITE_REACT_APP_SERVER,
      url: "/uncompleted",
    };
    const results = await axios<Task[]>(config);
    return results.data;
  } catch (e) {
    console.error(e);
  }
};

export const addTask = async (input: TaskInput) => {
  try {
    const config = {
      method: "post",
      baseURL: import.meta.env.VITE_REACT_APP_SERVER,
      url: "/task",
      data: input,
    };
    const result = await axios<Task>(config);
    return result.data;
  } catch (err) {
    console.error(err);
  }
};

export const editTask = async ({input, taskID}: TaskVariables) => {
  try {
    const config = {
      method: "put",
      baseURL: import.meta.env.VITE_REACT_APP_SERVER,
      url: `/task/${taskID}`,
      data: input,
    };
    const result = await axios<Task>(config);
    return result.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteTask = async (taskID: number | null) => {
    try {
    const config = {
      method: "delete",
      baseURL: import.meta.env.VITE_REACT_APP_SERVER,
      url: `/task/${taskID}`,
    };
    const result = await axios<Task>(config);
    return result.data;
  } catch (err) {
    console.error(err);
  }
};

export const completeTask = async (taskID: number | null) => {
  try {
    const config = {
      method: "put",
      baseURL: import.meta.env.VITE_REACT_APP_SERVER,
      url: `/complete/${taskID}`,
    };
    const result = await axios<Task>(config);
    return result.data;
  } catch (err) {
    console.error(err);
  }
};