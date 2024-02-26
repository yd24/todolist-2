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
        List 2
      </li>
      <li>
        List 3
      </li>
    </ul>
  );
}