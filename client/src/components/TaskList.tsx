import type { Task } from "../common/Task";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, deleteTask } from "../api/taskapi";

interface TaskListProps {
  setEditingHandler: (task: Task) => void;
  closeTaskModal: () => void;
}

export function TaskList(props: TaskListProps) {
  const queryClient = useQueryClient();

  const {
    data: taskList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-tasks"],
    queryFn: getTasks,
  });

  function deleteTaskHandler(taskID: number) {
    deleteTaskMutate.mutate(taskID);
    props.closeTaskModal();
  }

  const deleteTaskMutate = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      //later let's see if we can have an "undo" cache, maybe in state or localStorage?
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
    },
  });

  return (
    <div id="tasklist">
      <ul>
        {isLoading && (
          <li>
            <p>Loading data...</p>
          </li>
        )}

        {isError && (
          <li>
            <p>{error?.message}</p>
          </li>
        )}

        {taskList?.map((task: Task, idx) => {
          return (
            <li key={idx}>
              <h3>{task.title}</h3>
              <p>{task.content}</p>
              <p>Points: {task.point_value}</p>
              <p>Created on: {new Date(task.created_at).toDateString()}</p>
              <button onClick={() => props.setEditingHandler(task)}>
                Edit Task
              </button>
              <button onClick={() => deleteTaskHandler(task.taskid)}>
                Delete Task
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
