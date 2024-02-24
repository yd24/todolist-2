import type { Task } from '../common/Task';

interface TaskListProps {
  taskList: Task[];
  taskError: string | null;
}

export function TaskList(props: TaskListProps) {
  return (
    <div id="tasklist">
      <ul>
        {props.taskError &&
          <li><p>{props.taskError}</p></li>
        }
        {
          props.taskList.map((task: Task, idx) => {
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
