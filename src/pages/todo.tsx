import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { useState, useEffect } from "react";

import { ItemList } from "../types/itemList";
import ListItem from "../components/ListItem";
import { getTask, addTask } from "../services/todoApi";

function TodoForm() {
  const [task, setTask] = useState<string>("");
  const [listItem, setListItem] = useState<ItemList[]>([]);

  const { signed, user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };
  const handleAdd = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(task);
    addTask({ task: task, userId: user.userId });
    setTask("");
  };
  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  if (!signed) {
    navigate("/login");
  }

  useEffect(() => {
    const getItem = async () => {
      const response = await getTask();
      setListItem(response.data);
    };
    getItem();
  }, [listItem]);

  return (
    <>
      <h1 className="mt-3">TODO LIST</h1>
      <button
        style={{ position: "absolute", right: "1rem", top: "1rem" }}
        className="btn btn-primary "
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="p-3 rounded ">
        <form onSubmit={handleAdd} className="">
          <input
            className="w-75 me-3 p-2 border bg-light  rounded  fw-bold"
            type="text"
            placeholder="Tarefas"
            value={task}
            required
            onChange={handleChange}
          />
          <button className="btn btn-primary" type="submit">
            Adicionar
          </button>
        </form>
      </div>
      <ul>
        {listItem
          .filter((item) => item.userId == user.userId)
          .map((item) => (
            <ListItem
              task={item.task}
              _id={item._id}
              completed={item.completed}
              key={item._id}
            />
          ))}
      </ul>
    </>
  );
}

export default TodoForm;
