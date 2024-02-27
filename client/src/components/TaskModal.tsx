import type { TaskInput } from "../common/TaskInput";
import type { Task } from "../common/Task";

import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask, editTask } from "../api/taskapi";

interface TaskModalProps {
  closeTaskModal: () => void;
  isShowingTaskModal: boolean;
  isEditingTask: Task | null;
}

export function TaskModal(props: TaskModalProps) {
  const queryClient = useQueryClient();

  /*const [taskTitle, setTaskTitle] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [taskPoints, setTaskPoints] = useState<number>(0);*/

  const taskTitleRef = useRef<HTMLInputElement | null>(null);
  const taskDetailsRef = useRef<HTMLTextAreaElement | null>(null);
  const taskPointsRef = useRef<HTMLInputElement | null>(null);

  function addTaskHandler() {
    const newTask: TaskInput = {
      title: taskTitleRef.current!.value,
      content: taskDetailsRef.current!.value,
      point_value: Number(taskPointsRef.current!.value),
    };
    addTaskMutate.mutate(newTask);
    cleanupTaskModal();
  }

  function updateTaskHandler() {
    const updatedTask: TaskInput = {
      title: taskTitleRef.current!.value,
      content: taskDetailsRef.current!.value,
      point_value: Number(taskPointsRef.current!.value),
    };
    const taskVariables = {
      input: updatedTask,
      editTask: props.isEditingTask,
    };
    updateTaskMutate.mutate(taskVariables);
    cleanupTaskModal();
  }

  function cleanupTaskModal() {
    props.closeTaskModal();
  }

  const addTaskMutate = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-tasks'] });
    },
  });

  const updateTaskMutate = useMutation({
    mutationFn: editTask,
    onSuccess: (data: Task | undefined) => {
      //need to fix this, does not actually update the cache because
      //this doesn't locate the updated item.
      queryClient.setQueryData(['get-tasks', data?.taskID], data);
    },
  });

  useEffect(() => {
    if (taskTitleRef.current) {
      taskTitleRef.current.value = props.isEditingTask
        ? props.isEditingTask.title
        : "";
    }
    if (taskDetailsRef.current) {
      taskDetailsRef.current.value = props.isEditingTask
        ? props.isEditingTask.content
        : "";
    }
    if (taskPointsRef.current) {
      taskPointsRef.current.value = props.isEditingTask
        ? props.isEditingTask.point_value.toString()
        : "0";
    }
  }, [props.isEditingTask]);

  return (
    <>
      {props.isShowingTaskModal && (
        <div id="task-modal-container">
          <p id="task-modal-close">
            <button onClick={props.closeTaskModal}>X</button>
          </p>
          <div id="task-modal-input">
            <label>
              <p>Task:</p>
              <input
                name="task-title"
                type="text"
                maxLength={255}
                size={25}
                ref={taskTitleRef}
              />
            </label>
            <label>
              <p>Details:</p>
              <textarea
                rows={10}
                cols={50}
                name="task-details"
                placeholder="Enter details of the task here"
                ref={taskDetailsRef}
              />
            </label>
            <label>
              <p>Point Value:</p>
              <input
                name="points"
                type="number"
                min="0"
                max="9999"
                ref={taskPointsRef}
              />
            </label>
            <div id="task-modal-btns">
              <button
                onClick={
                  props.isEditingTask ? updateTaskHandler : addTaskHandler
                }
              >
                {props.isEditingTask ? "Save Changes" : "Add New Task"}
              </button>
              {addTaskMutate.isError && <p>{addTaskMutate.error?.message}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
