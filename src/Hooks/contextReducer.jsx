import { useReducer } from "react";
import { createContext, useContext } from "react";

export const ACTIONS = {
  REMOVE: "DELETE",
  TOGGLE: "TOGGLE",
  ADD: "ADD",
  UPDATE: "UPDATE",
};

function tasksReducer(tasks, { type, payload }) {
  const { REMOVE, TOGGLE, ADD, UPDATE } = ACTIONS;
  switch (type) {
    case REMOVE:
      return tasks.filter(task => task.id !== payload);
    case TOGGLE:
      return tasks.map(task =>
        task.id == payload.id ? { ...task, completed: !task.completed } : task
      );
    case ADD:
      return [...tasks, payload];
    case UPDATE:
      return tasks.map(task =>
        task.id == payload.id
          ? { id: task.id, completed: task.completed, name: payload.name }
          : task
      );
  }
}

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const initialTodo = JSON.parse(localStorage.getItem("todos")) || [];
  const [tasks, dispatch] = useReducer(tasksReducer, initialTodo);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
