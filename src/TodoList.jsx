import React from "react";
import { useTasks } from "./Hooks/contextReducer";
import { TodoItem } from "./TodoItem";

function TodoList({ filteredTodos, isHiddenComplete }) {
  const todos = useTasks();
  return (
    <ul id="list">
      {filteredTodos?.map(todo => (
        <TodoItem key={todo.id} id={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
