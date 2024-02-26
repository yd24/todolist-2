import './App.css'
import { Sidebar } from './components/Sidebar';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';

import { useState } from 'react';

function App() {
  const [isShowingTaskModal, setShowTaskModal] = useState<boolean>(false);

  const showTaskModal = () => {
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
  }

  return (
    <>
      <div id="task-wrapper">
        <Sidebar showTaskModal={showTaskModal}/>
        <TaskModal isShowingTaskModal={isShowingTaskModal} closeTaskModal={closeTaskModal} />
        <TaskList />
      </div>
    </>
  )
}

export default App
