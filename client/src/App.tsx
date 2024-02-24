import './App.css'
import { Sidebar } from './components/Sidebar';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';
import type { Task } from './common/Task';
import type { TaskInput } from './common/TaskInput';

import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [taskList, setTasks] = useState<Task[]>([]);
  const [taskError, setTaskError] = useState<string | null>(null);
  const [isShowingTaskModal, setShowTaskModal] = useState<boolean>(false);

  const showTaskModal = () => {
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
  }

  const getTasks = async() => {
    try {
      const config = {
        method: 'get',
        baseURL: import.meta.env.VITE_REACT_APP_SERVER,
        url: '/task',
      };
      const results = await axios<Task[]>(config);
      setTasks(results.data);
    } catch (e) {
      console.error(e);
      setTaskError('Unable to retrieve tasks.');
    }
  };

  const addTask = async(input: TaskInput) => {
    try {
      const config = {
        method: 'post',
        baseURL: import.meta.env.VITE_REACT_APP_SERVER,
        url: '/task',
        data: input,
      };
      const result = await axios<Task>(config);
      setTasks([...taskList, result.data]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <div id="task-wrapper">
        <Sidebar showTaskModal={showTaskModal}/>
        <TaskModal isShowingTaskModal={isShowingTaskModal} closeTaskModal={closeTaskModal} addTask={addTask}/>
        <TaskList taskList={taskList} taskError={taskError} />
      </div>
    </>
  )
}

export default App
