import React from "react";
import { useRef } from "react";
import { useTasks } from "./Hooks/contextReducer";

function FilterInput({
  filteredTodos,
  setFilteredTodos,
  isHiddenComplete,
  setIsHiddenComplete,
}) {
  const todos = useTasks();
  const nameInput = useRef("");

  const handleChange = () => {
    handleFilter(isHiddenComplete, nameInput.current.value);
    // setFilteredTodos(
    //   todos.filter(t => t.name.toLowerCase().includes(str.toLowerCase()))
    // );
  };

  const checkToggle = checked => {
    setIsHiddenComplete(checked);
    handleFilter(checked, nameInput.current.value);
  };

  const handleFilter = (hideComplete, nameInput) => {
    let list = todos;
    if (!hideComplete && nameInput === "") {
      setFilteredTodos(list);
      return;
    }
    if (hideComplete) list = list.filter(l => l.completed == false);
    if (nameInput.length > 0) {
      list = list.filter(l =>
        l.name.toLowerCase().includes(nameInput.toLowerCase())
      );
    }
    setFilteredTodos(list);
  };

  return (
    <div className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInput} onChange={handleChange} />
      </div>
      <label>
        <input
          type="checkbox"
          value={isHiddenComplete}
          checked={isHiddenComplete}
          onChange={e => checkToggle(e.target.checked)}
        />
        Hide Completed
      </label>
    </div>
  );
}

export default FilterInput;
