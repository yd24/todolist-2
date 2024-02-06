import { ProgressBar } from './ProgressBar';
import { SideOptions } from './SideOptions';

export function Sidebar() {
  return (
    <div id="sidebar">
      <ProgressBar />
      <SideOptions />
    </div>
  );
}