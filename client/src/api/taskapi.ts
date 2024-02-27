import axios from "axios";
import type { Task } from "../common/Task";
import type { TaskInput } from "../common/TaskInput";

interface TaskVariables {
  input: TaskInput;
  editTask: Task | null;
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

export const editTask = async ({input, editTask}: TaskVariables) => {
  try {
    const config = {
      method: "put",
      baseURL: import.meta.env.VITE_REACT_APP_SERVER,
      //not sure why, but when accessing the property,
      //it can only be accessed with the wrong case
      //from what's defined in the type.
      //aka taskid instead of taskID.
      url: `/task/${editTask.taskid}`,
      data: input,
    };
    const result = await axios<Task>(config);
    return result.data;
  } catch (err) {
    console.error(err);
  }
};
