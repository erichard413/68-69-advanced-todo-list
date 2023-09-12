import { useState, useEffect, useRef } from "react";
import "./styles.css";
import { useTasks, useTasksDispatch } from "./Hooks/contextReducer";
import { ACTIONS } from "./Hooks/contextReducer";
import TodoList from "./TodoList";
import FilterInput from "./FilterInput";

const { ADD } = ACTIONS;

function App() {
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isHiddenComplete, setIsHiddenComplete] = useState(false);
  const dispatch = useTasksDispatch();
  const todos = useTasks();
  const inputTodoRef = useRef("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setFilteredTodos(todos);
  }, [todos]);

  function addNewTodo(e) {
    e.preventDefault();
    let newTodo = {
      name: inputTodoRef.current.value,
      completed: false,
      id: crypto.randomUUID(),
    };
    dispatch({ type: ADD, payload: newTodo });
    inputTodoRef.current.value = "";
  }

  return (
    <>
      <FilterInput
        filteredTodos={filteredTodos}
        setFilteredTodos={setFilteredTodos}
        isHiddenComplete={isHiddenComplete}
        setIsHiddenComplete={setIsHiddenComplete}
      />
      <TodoList
        filteredTodos={filteredTodos}
        isHiddenComplete={isHiddenComplete}
      />
      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input type="text" id="todo-input" ref={inputTodoRef} />
        <button onClick={addNewTodo}>Add Todo</button>
      </div>
    </>
  );
}

export default App;
