import "./App.css";
import React from "react";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import TodoForm from "./pages/todo";
import { AuthContext } from "./context/authContext";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
function App() {
  const { signed } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/todo" element={signed ? <TodoForm /> : <Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
