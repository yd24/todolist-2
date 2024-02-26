import type { Task } from '../common/Task';
import type { TaskInput } from '../common/TaskInput';

import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

interface TaskModalProps {
  closeTaskModal: () => void;
  isShowingTaskModal: boolean;
}

export function TaskModal(props: TaskModalProps) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [taskPoints, setTaskPoints] = useState<number>(0);

  const addTask = async(input: TaskInput) => {
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

  function addTaskHandler() {
    const newTask: TaskInput = {
      title: taskTitle,
      content: taskDetails,
      point_value: taskPoints,
    };
    setTaskTitle('');
    setTaskDetails('');
    setTaskPoints(0);
    props.closeTaskModal();
  }
  
  return (
    <>
      {props.isShowingTaskModal &&
        <div id="task-modal-container">
          <p id="task-modal-close">
            <button onClick={props.closeTaskModal}>X</button>
          </p>
          <div id="task-modal-input">
            <label>
              <p>Task:</p> 
              <input name="task-title" type="text" maxLength={255} size={25} onChange={(e) => {setTaskTitle(e.target.value)}} value={taskTitle}/>
            </label>
            <label>
              <p>Details:</p>
              <textarea rows={10} cols={50} name="task-details" placeholder="Enter details of the task here" onChange={(e) => {setTaskDetails(e.target.value)}} value={taskDetails}/>
            </label>
            <label>
              <p>Point Value:</p>
              <input name="points" type="number" min="0" max="9999" onChange={(e) => {setTaskPoints(e.target.valueAsNumber)}} value={taskPoints}/>
            </label>
            <div id="task-modal-btns">
              <button onClick={addTaskHandler}>Add New Task</button>
            </div>
          </div>
        </div>
      }
    </>
  );
}