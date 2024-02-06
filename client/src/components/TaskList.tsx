export function TaskList() {
  return (
    <div id="tasklist">
      <ul>
        {
          [...Array(10)].map((ele, i) => (
            <li key={i}>
              Buy groceries
            </li>
          ))
        }
      </ul>
    </div>
  );
}
