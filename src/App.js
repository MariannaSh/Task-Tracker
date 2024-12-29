import React, { useState } from "react";
import "./App.css";

// Компонент WelcomeScreen
function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-screen">
      <h1>Welcome to the Priority To-Do List!</h1>
      <p className="welcome-description">
        Organize your day, boost productivity, and track your progress easily!
      </p>
      <ul>
        <li>Create tasks with different priorities.</li>
        <li>Complete tasks by marking them as done.</li>
        <li>Clear completed tasks to stay on track.</li>
      </ul>
      <button onClick={onStart} className="start-button">
      Get Started
      </button>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("low");
  const [showWelcome, setShowWelcome] = useState(true); // Статус для отображения экрана приветствия

  const addTask = () => {
    if (taskText.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: taskText, priority, done: false }]);
    setTaskText("");
  };

  const toggleDone = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.done));
  };

  const priorities = [
    { key: "low", label: "Low" },
    { key: "medium", label: "Medium" },
    { key: "high", label: "High" },
  ];

  const handleStart = () => {
    setShowWelcome(false); // Скрываем экран приветствия, когда пользователь готов начать
  };

  // Если нужно показать экран приветствия
  if (showWelcome) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <div className="App">
      <h1>Priority To-Do List</h1>
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
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-columns">
        {priorities.map((p) => (
          <div key={p.key} className="task-column">
            <h2>{p.label}</h2>
            <ul>
              {tasks
                .filter((task) => task.priority === p.key)
                .map((task) => (
                  <li key={task.id} className={task.done ? "task-done" : ""}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleDone(task.id)}
                      />
                      {task.text}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <button onClick={clearCompleted} className="clear-button">
        Clear Completed Tasks
      </button>
    </div>
  );
}

export default App;
