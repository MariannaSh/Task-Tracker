import React from "react";

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

export default WelcomeScreen;
