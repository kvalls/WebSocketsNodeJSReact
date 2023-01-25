import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from './components/tasks/TodoList';
import JoinRoom from './components/rooms/JoinRoom';
import './App.scss';

function App() {
  return (
    <div classname="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<JoinRoom/>} exact />
        <Route path='/:room' element={<TodoList/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;