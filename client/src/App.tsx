import './App.css'
import type { Task } from './common/Task';

import { Sidebar } from './components/Sidebar';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';

import { useState } from 'react';

function App() {
  const [isShowingTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [isEditingTask, setIsEditingTask] = useState<Task | null>(null);

  const showTaskModal = () => {
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setIsEditingTask(null);
  }

  const setEditingHandler = (task: Task) => {
    setIsEditingTask(task);
    setShowTaskModal(true);
  };

  return (
    <>
      <div id="task-wrapper">
        <Sidebar showTaskModal={showTaskModal} />
        <TaskModal isShowingTaskModal={isShowingTaskModal} isEditingTask={isEditingTask} closeTaskModal={closeTaskModal} />
        <TaskList closeTaskModal={closeTaskModal} setEditingHandler={setEditingHandler} />
      </div>
    </>
  )
}

export default App
