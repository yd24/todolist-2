import axios from 'axios';
import type { Task } from '../common/Task';
import type { TaskInput } from '../common/TaskInput';

export const getTasks = async() => {
  try {
    const config = {
      method: 'get',
      baseURL: import.meta.env.VITE_REACT_APP_SERVER,
      url: '/task',
    };
    const results = await axios<Task[]>(config);
    return results.data;
  } catch (e) {
    console.error(e);
  }
};

export const addTask = async(input: TaskInput) => {
  try {
    const config = {
      method: 'post',
      baseURL: import.meta.env.VITE_REACT_APP_SERVER,
      url: '/task',
      data: input,
    };
    const result = await axios<Task>(config);
    return result;
  } catch (err) {
    console.error(err);
  }
};