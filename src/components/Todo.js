import {
  CheckCircleIcon,
  PencilIcon,
  TrashcanIcon,
  XCircleIcon,
} from "@primer/octicons-react";
import React, { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const none = {
  id: -1,
};
export default function Todo() {
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/todos")
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setTodo(result);
    //     setBackup(result);
    //   })
    //   .catch((err) => console.log(err));
    if (localStorage.getItem("todo")) {
      setTodo(JSON.parse(localStorage.getItem("todo")));
    }
  }, []);
  const [todo, setTodo] = useState("");
  const [backup, setBackup] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState({ id: -1 });
  const [errors, setErrors] = useState(false);
  const [search, setSearch] = useState("");
  const setMainBackup = (list) => {
    setTodo(list);
    setBackup(list);
    localStorage.setItem("todo", JSON.stringify(todo));
  };
  const onAdd = (e) => {
    e.preventDefault();
    const id = uuidv4();
    if (!newTodo || newTodo.length > 24) {
      setErrors(true);
    } else {
      setErrors(false);
      const addForm = {
        id: id,
        title: newTodo,
      };
      const list = [...todo, addForm];
      setMainBackup(list);
    }
  };
  const onDelete = (id) => {
    const list = todo.filter((x) => x.id !== id);
    setMainBackup(list);
  };
  const setEditForm = (todo) => {
    setEditTodo(todo.id !== editTodo.id ? todo : none);
  };
  const clearEdit = () => {
    setEditTodo(none);
  };
  const onSearch = (e) => {
    e.preventDefault();
    if (search) {
      const list = todo.filter((x) => x.title === search);
      setTodo(list);
    } else {
      setTodo(backup);
    }
  };
  const onSaveEdit = () => {
    setTodo(todo.map((task) => (task.id === editTodo.id ? editTodo : task)));
    setEditTodo(none);
  };
  console.log(localStorage.getItem("todo"));
  return (
    <Fragment>
      <div className="heading-primary">
        <span className="heading-primary--title">ToDo List</span>
      </div>
      <form onSubmit={onAdd}>
        <input
          type="text"
          className="todo-input"
          placeholder="Enter a ToDo"
          name="title"
          value={newTodo || ""}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="todo--button" type="submit">
          Submit
        </button>
      </form>
      {errors ? (
        <span className="todoList__section--error">
          ERROR Enter valid Input
        </span>
      ) : (
        ""
      )}
      <div className="todolist__container">
        {todo &&
          todo.map((task) => (
            <ToDoListItem
              key={task.id}
              onDelete={() => onDelete(task.id)}
              title={task.title}
              onEdit={() => setEditForm(task)}
              editTodo={editTodo}
              editCheck={editTodo.id === task.id ? true : false}
              clearEdit={() => clearEdit()}
              setEditTodo={(e) =>
                setEditTodo({ ...editTodo, [e.target.name]: e.target.value })
              }
              onSaveEdit={() => onSaveEdit()}
            />
          ))}
      </div>
      <form onSubmit={onSearch}>
        <input
          type="text"
          name="search"
          className="todo-input"
          value={search || ""}
          placeholder="Search for Todo"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="todo--button" type="submit">
          Search
        </button>
      </form>
    </Fragment>
  );
}

const ToDoListItem = (props) => {
  const {
    onEdit,
    onDelete,
    editCheck,
    title,
    clearEdit,
    onSaveEdit,
    setEditTodo,
    editTodo,
  } = props;

  return (
    <div className="todolist__item">
      {editCheck ? (
        <EditTodoMode
          onChange={setEditTodo}
          title={title}
          onSaveEdit={onSaveEdit}
          onRemove={clearEdit}
          value={editTodo.title}
        />
      ) : (
        <ViewToDoMode title={title} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  );
};

const EditTodoMode = ({ title, onSaveEdit, onRemove, onChange, value }) => {
  return (
    <Fragment>
      <input
        type="text"
        value={value}
        name="title"
        onChange={onChange}
        placeholder={title}
      />
      <ToDoListButton onClick={onSaveEdit}>
        <CheckCircleIcon size={24} />
      </ToDoListButton>
      <ToDoListButton onClick={onRemove}>
        <XCircleIcon size={24} />
      </ToDoListButton>
    </Fragment>
  );
};

const ViewToDoMode = ({ title, onEdit, onDelete }) => (
  <Fragment>
    <div className="todolist__item--start">
      <p>{title}</p>{" "}
    </div>
    <ToDoListButton onClick={onEdit}>
      <PencilIcon className="img--button" size={24} />
    </ToDoListButton>
    <ToDoListButton onClick={onDelete}>
      <TrashcanIcon className="img--button" size={24} />
    </ToDoListButton>
  </Fragment>
);

const ToDoListButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="icon--button">
      {children}
    </button>
  );
};
