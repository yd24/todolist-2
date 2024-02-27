import type { Task } from '../common/Task';

import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/taskapi';

interface TaskListProps {
  setEditingHandler: (task: Task) => void;
}

export function TaskList(props: TaskListProps) {
  const {data: taskList, isLoading, isError, error } = useQuery({
    queryKey: ['get-tasks'],
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
                <button onClick={() => props.setEditingHandler(task)}>Edit Task</button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}
