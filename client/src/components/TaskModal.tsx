import { useState } from 'react';

interface TaskModalProps {
  closeTaskModal: () => void;
  isShowingTaskModal: boolean;
}

export function TaskModal(props: TaskModalProps) {
  return (
    <>
      {props.isShowingTaskModal &&
        <div id="task-modal-container">
          <p id="task-modal-close">
            <button onClick={props.closeTaskModal}>X</button>
          </p>
          <div id="task-modal-input">
            <p>Task</p>
            <input type="text" />
            <p>Details</p>
            <textarea />
            <p>Point Value</p>
            <input type="text" />

            <div id="task-modal-btns">
              <button>Add New Task</button>
            </div>
          </div>
        </div>
      }
    </>
  );
}