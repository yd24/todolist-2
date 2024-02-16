import axios from 'axios';
import {useState, useEffect} from 'react';

export function TaskList() {
  interface Task {
    taskID: number,
    title: string,
    content: string,
    is_completed: boolean,
    point_value: number,
    created_at: string,
  }

  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async() => {
    try {
      const config = {
        method: 'get',
        baseURL: import.meta.env.VITE_REACT_APP_SERVER,
        url: '/task',
      };
      const results = await axios<Task[]>(config);
      setTasks(results.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div id="tasklist">
      <ul>
        {
          tasks.map((task: Task, idx) => {
            return (
              <li key={idx}>
                <h3>{task.title}</h3>
                <p>{task.content}</p>
                <p>Points: {task.point_value}</p>
                <p>Created on: {new Date(task.created_at).toDateString()}</p>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}
