import React from "react";
import { useState } from "react";
import { useTasksDispatch } from "./Hooks/contextReducer";
import { ACTIONS } from "./Hooks/contextReducer";

const { REMOVE, TOGGLE, UPDATE } = ACTIONS;

export function TodoItem({ todo }) {
  const initialForm = {
    name: todo.name,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [checked, setChecked] = useState(todo.completed);
  const dispatch = useTasksDispatch();

  function deleteTodo() {
    dispatch({ type: REMOVE, payload: todo.id });
  }

  function toggleEdit() {
    setIsEditing(edit => !edit);
  }
  function updateTodo() {
    dispatch({
      type: UPDATE,
      payload: { id: todo.id, name: formData.name },
    });
    setIsEditing(editing => !editing);
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  function toggleCheck() {
    setChecked(checked => !checked);
    dispatch({
      type: TOGGLE,
      payload: { id: todo.id, completed: checked },
    });
  }

  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          checked={checked}
          value={formData.completed}
          type="checkbox"
          data-list-item-checkbox
          onChange={toggleCheck}
        />
        {isEditing && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        )}
        {!isEditing && <span data-list-item-text>{todo.name}</span>}
      </label>
      {!isEditing && (
        <>
          <button onClick={() => toggleEdit()} data-button-delete>
            Edit
          </button>
          <button onClick={() => deleteTodo()} data-button-delete>
            Delete
          </button>
        </>
      )}
      {isEditing && (
        <>
          <button onClick={() => updateTodo()} data-button-delete>
            Update
          </button>
          <button onClick={() => toggleEdit()} data-button-delete>
            Cancel
          </button>
        </>
      )}
    </li>
  );
}
