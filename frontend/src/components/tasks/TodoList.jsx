import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TodoList.scss';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const { room } = useParams();
  const wsRef = useRef();

  useEffect(() => {
    wsRef.current = new WebSocket(process.env.REACT_APP_URL);

    wsRef.current.onopen = () => {
      wsRef.current.send(
        JSON.stringify({
          type: 'join',
          room,
        }),
      );
    };

    wsRef.current.onmessage = (e) => {
      const receivedData = JSON.parse(e.data);
      if (receivedData.type === 'remove') {
        setTasks(prevTasks => prevTasks.filter(task => task.name !== receivedData.task.name || task.id !== receivedData.task.id))
      } else {
        setTasks((prevTasks) => [...prevTasks, receivedData]);
      }
    };

    return () => {
      wsRef.current.close();
    };
  }, [room]);

  function handleAddTask(e) {
    e.preventDefault();
    const task = { name: e.target.task.value, completed: false, id: Date.now() };
    setTasks([...tasks, task]);
    wsRef.current.send(
      JSON.stringify({
        type: 'add',
        task,
        room,
      }),
    );
    e.target.task.value = '';
  }


  function handleRemoveTask(task) {
    setTasks((prevTasks) => prevTasks.filter((t) => t !== task));
    wsRef.current.send(
      JSON.stringify({
        type: 'remove',
        task,
        room,
      }),
    );
  }

  return (
    <div className="TodoList">
      <h1>Todo List</h1>
      <form onSubmit={handleAddTask}>
        <label>
          Task:
          <input type="text" name="task" />
        </label>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name}
            <button onClick={() => handleRemoveTask(task)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
