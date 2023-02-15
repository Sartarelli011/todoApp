import React from "react";

import { updateTask, deleteTask } from "../services/todoApi";
import { ItemList } from "../types/itemList";
function ListItem({ _id, task, completed }: ItemList) {
  const updateItem = () => {
    completed = !completed;
    updateTask(_id, { completed: completed });
  };

  const deleteItem = () => {
    deleteTask(_id);
  };
  return (
    <div
      className=" p-3 text-bg-primary rounded d-flex justify-content-center align-items-center mt-2"
      key={_id}
    >
      {/*  <button className="btn border" type="checkbox"></button> */}
      <input
        className="form-check-input p-2"
        type="checkbox"
        id="checkboxNoLabel"
        checked={completed}
        onChange={updateItem}
        style={{ cursor: "pointer" }}
      />
      <p
        className={
          !completed
            ? "fs-5 mb-0 p-0 ms-2"
            : "fs-5 mb-0 p-0 ms-2 text-decoration-line-through"
        }
      >
        {task}
      </p>
      <div className=" me-2 d-flex">
        <button
          className="btn border rounded text-bg-primary"
          onClick={deleteItem}
        >
          remover
        </button>
      </div>
    </div>
  );
}

export default ListItem;
