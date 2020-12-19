import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Todo from "./components/Todo";

// const toDoForm = {
//   id: "",
//   completed: false,
//   task: "",
//   date: "",
// };
export default function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userAuth")) {
      setAuth(JSON.parse(localStorage.getItem("userAuth")));
    }
  }, []);
  const userAuth = (value) => {
    setAuth(value);
    localStorage.setItem("userAuth", JSON.stringify(value));
  };
  const logout = () => {
    setAuth(false);
    localStorage.removeItem("userAuth");
  };
  return (
    <BackgroundContainer auth={auth} logout={() => logout()}>
      {!auth ? <Login setAuth={(props) => userAuth(props)} /> : <Todo />}
    </BackgroundContainer>
  );
}

const BackgroundContainer = ({ children, auth, logout }) => (
  <div className="todo__background">
    {auth && (
      <button className="logout--button" onClick={logout}>
        Logout
      </button>
    )}
    <div className="container">
      <div className="paper__background">
        <div className="todo__section">{children}</div>
      </div>
    </div>
  </div>
);
