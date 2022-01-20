import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@material-ui/core";

const Form = ({
  inputText,
  setInputText,
  todos,
  setTodos,
  setStatus,
  setSelectedDate,
  selectedDate,
  todo,
}) => {
  // const prioritedHandler = () => {
  //   setTodos(
  //     todos.map((item) => {
  //       if (item.id === todo.id) {
  //         return {
  //           ...item,
  //           priorited: !item.priorited,
  //         };
  //       }
  //       return item;
  //     })
  //   );
  // };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    selectedDatesHandler(date);
  };
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };
  const selectedDatesHandler = (e) => {
    setSelectedDate(e.target.value.toDateString());
  };

  const submitToDoHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        text: inputText,
        completed: false,
        id: Math.random() * 1000,
        date: selectedDate,
        // priorited: checkBoxClicked,
      },
    ]);
    setInputText("");
    setSelectedDate("");
  };

  // const checkBoxClicked = () => {
  //   todo.priorited = true;
  // };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  return (
    <form>
      <div className="utils-container">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            class="date-picker"
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            helperText={""}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        {/* <Checkbox
          className="priority-btn"
          onClick={checkBoxClicked}
          onChange={prioritedHandler}
        ></Checkbox> */}
      </div>
      <div className="form-container">
        <input
          value={inputText}
          onChange={inputTextHandler}
          type="text"
          className="todo-input"
        />
        <button
          onClick={submitToDoHandler}
          className="todo-button"
          type="submit"
        >
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select onChange={statusHandler} name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
            <option value="priorited">Priorited</option>
            <option value="priorited">Unpriorited</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default Form;
