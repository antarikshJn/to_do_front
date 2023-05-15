import './App.css';


import React, { useState,useEffect } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    getTasks();
  },[]);

  const getTasks = async ()=>{
    const url = "http://localhost:3100/documents";

    const response = await fetch(url);
    const data =await response.json();
    console.log(data);
    setTasks(data);
  }

  const handleSubmit = async () => {
    const taskName = document.getElementById("task").value;
    const url = "http://localhost:3100/documents";
    const options={
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "text":taskName
      }),
    }

    const response = await fetch(url,options);
    const data =await response.json();
    console.log(data);
    getTasks();
  };

  const handleDelete = async (id) => {
    const url = "http://localhost:3100/delete";
    const options={
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id":id
      }),
    }

    const response = await fetch(url,options);
    const data =await response.json();
    console.log(data);
    getTasks();
  };

  const handleComplete = async (id) => {
    const url = "http://localhost:3100/update";
    const options={
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id":id
      }),
    }

    const response = await fetch(url,options);
    const data =await response.json();
    console.log(data);
    getTasks();
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <label htmlFor="task">New Task:</label>
        <input type="text" id="task" name="task" />
        <button type="submit" onClick={handleSubmit}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className={task.completed ? 'completed' : ''}>{task.text}</span>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            {!task.completed && <button onClick={() => handleComplete(task._id)}>Complete</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
