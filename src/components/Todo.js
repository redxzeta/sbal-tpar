import { PencilIcon, TrashcanIcon } from "@primer/octicons-react";
import React, { useEffect, useState } from "react";

export default function Todo() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((result) => {
        setTodo(result);
      })
      .catch((err) => console.log(err));
  }, []);
  const [todo, setTodo] = useState("");
  console.log(todo);
  const onDelete = (id) => {
    const list = todo.filter((x) => x.id !== id);
    setTodo(list);
  };
  return (
    <div className="todo__section">
      <div className="heading-primary">
        <span className="heading-primary--title">TODO LIST</span>
      </div>
      <form>
        <input type="text" className="todo-input" />
        <button className="todo--button" type="submit">
          SUBMIT
        </button>
      </form>
      <div className="todolist__container">
        {todo &&
          todo.map((task) => (
            <ToDoListItem
              key={task.id}
              onDelete={() => onDelete(task.id)}
              title={task.title}
            />
          ))}
      </div>
    </div>
  );
}

const ToDoListItem = (props) => (
  <div className="todolist__item">
    <div className="todolist__item--start">{props.title}</div>
    <button className="icon--button">
      <PencilIcon className="img--button" size={24} />
    </button>
    <button className="icon--button" onClick={props.onDelete}>
      <TrashcanIcon className="img--button" size={24} />
    </button>
  </div>
);
