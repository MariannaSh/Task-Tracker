import React, { useState, useEffect } from "react";
import WelcomeScreen from './components/WelcomeScreen';
import TaskInput from './components/TaskInput';
import TaskColumn from './components/TaskColumn';
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("low");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const clearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.done);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (taskText.trim() === "") return;
    if (editingTaskId) {
      setTasks(tasks.map(task => task.id === editingTaskId ? { ...task, text: taskText, priority } : task));
      setEditingTaskId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: taskText, priority, done: false }]);
    }
    setTaskText("");
  };

  const editTask = (task) => {
    setTaskText(task.text);
    setPriority(task.priority);
    setEditingTaskId(task.id);
  };

  const toggleDone = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const priorities = [
    { key: "low", label: "Low" },
    { key: "medium", label: "Medium" },
    { key: "high", label: "High" },
  ];

  const handleStart = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <div className="App">
      <h1>Priority To-Do List</h1>
      <TaskInput
        taskText={taskText}
        setTaskText={setTaskText}
        priority={priority}
        setPriority={setPriority}
        addTask={addTask}
        editingTaskId={editingTaskId}
      />
      <div className="task-columns">
        {priorities.map((p) => (
          <TaskColumn
            key={p.key}
            priority={p}
            tasks={tasks}
            toggleDone={toggleDone}
            editTask={editTask}
          />
        ))}
      </div>
      <button onClick={clearCompleted} className="clear-button">
        Clear Completed Tasks
      </button>
    </div>
  );
}

export default App;
