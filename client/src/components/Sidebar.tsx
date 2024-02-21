import { ProgressBar } from './ProgressBar';
import { SideOptions } from './SideOptions';

interface SidebarProps {
  showTaskModal: () => void;
}

export function Sidebar(props: SidebarProps) {
  return (
    <div id="sidebar">
      <ProgressBar />
      <SideOptions showTaskModal={props.showTaskModal}/>
    </div>
  );
}