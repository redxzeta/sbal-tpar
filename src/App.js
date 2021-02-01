import React from "react";

import Todo from "./components/Todo";

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
      <div className="paper__background">
        <div className="todo__section">{children}</div>
      </div>
    </div>
  </div>
);
