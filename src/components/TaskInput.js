import React from "react";

function TaskInput({ taskText, setTaskText, priority, setPriority, addTask, editingTaskId }) {
  const priorities = [
    { key: "low", label: "Low" },
    { key: "medium", label: "Medium" },
    { key: "high", label: "High" },
  ];

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter a task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        {priorities.map((p) => (
          <option key={p.key} value={p.key}>
            {p.label}
          </option>
        ))}
      </select>
      <button onClick={addTask}>{editingTaskId ? "Save Task" : "Add Task"}</button>
    </div>
  );
}

export default TaskInput;
