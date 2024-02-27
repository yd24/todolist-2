interface SideOptionsProps {
  showTaskModal: () => void;
}

export function SideOptions(props: SideOptionsProps) {
  return (
    <ul id="side-options">
      <li>
        <button onClick={props.showTaskModal}>Add Task</button>
      </li>
      <li>
        <button>Set Reward</button>
      </li>
      <li>
        List 3
      </li>
    </ul>
  );
}