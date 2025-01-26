import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";


function TaskColumn({ priority, tasks, toggleDone, editTask }) {
  return (
    <div className="task-column">
      <h2>{priority.label}</h2>
      <ul>
        {tasks
          .filter((task) => task.priority === priority.key)
          .map((task) => (
            <li key={task.id} className={task.done ? "task-done" : ""}>
              <div className="task-item">
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(task.id)}
                  />
                  {task.text}
                </label>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="edit-icon"
                  onClick={() => editTask(task)}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TaskColumn;
