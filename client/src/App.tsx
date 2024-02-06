import './App.css'
import { Sidebar } from './components/Sidebar';
import { TaskList } from './components/TaskList';

function App() {

  return (
    <>
      <div id="task-wrapper">
        <Sidebar />
        <TaskList />
      </div>
    </>
  )
}

export default App
