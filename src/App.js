import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      // case "priorited":
      //   setFilteredTodos(todos.filter((todo) => todo.priorited === true));
      // case "unpriorited":
      //   setFilteredTodos(todos.filter((todo) => todo.priorited === false));
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>TODO List</header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      ></Form>
      <br />
      {/* <input type="checkbox" value={checked} onChange={handleChange}></input> */}
      <TodoList
        filteredTodos={filteredTodos}
        todos={todos}
        setTodos={setTodos}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      ></TodoList>
    </div>
  );
}

export default App;
