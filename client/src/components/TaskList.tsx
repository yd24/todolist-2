import type { Task } from '../common/Task';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export function TaskList() {
  const getTasks = async() => {
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

  const {data: taskList, isLoading, isError, error } = useQuery({
    queryKey: ['get-todo'],
    queryFn: getTasks,
  });

  return (
    <div id="tasklist">
      <ul>
        {isLoading &&
          <li><p>Loading data...</p></li>
        }

        {isError &&
          <li><p>{error?.message}</p></li>
        }

        {
          taskList?.map((task: Task, idx) => {
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
