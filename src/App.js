import React from "react";
import Todo from "./components/Todo";

// const toDoForm = {
//   id: "",
//   completed: false,
//   task: "",
//   date: "",
// };
export default function App() {
  return (
    <BackgroundContainer>
      <Todo />
    </BackgroundContainer>
  );
}

const BackgroundContainer = ({ children }) => (
  <div className="todo__background">
    <div className="container">
      <div className="paper__background">{children}</div>
    </div>
  </div>
);
