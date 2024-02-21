import { useState } from 'react';

interface TaskModalProps {
  closeTaskModal: () => void;
  isShowingTaskModal: boolean;
}

export function TaskModal(props: TaskModalProps) {
  return (
    <>
      {props.isShowingTaskModal &&
        <div id="taskModal">
          <p>Modal is showing!</p>
          <button onClick={props.closeTaskModal}>Close Modal</button>
        </div>
      }
    </>
  );
}