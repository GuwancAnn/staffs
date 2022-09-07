import React from "react";
import "../App.css";
import NotDoneIcon from "../svgphoto/Ellipse9.svg";
import doneIcon from "../svgphoto/Ellipse13.svg";
import editIcon from "../svgphoto/editIcon.svg";
import deleteIcon from "../svgphoto/deleteIcon.svg";
import { MainContext, useContext } from "../context.js";

export default function TodoList({ todosByCategory, category, categoryId }) {
  const { todos, settodoInput, setTodos } = useContext(MainContext);

  const deltext = (id) => {
    const newArr = todos.filter((todo) => todo.id !== id); //todos arraydan basan idmizi tapdy we pozdy

    setTodos(newArr);
  };

  const changetodo = (id) => {
    const newTodos = [...todos];
    const index = todos.findIndex((todo) => todo.id === id);
    newTodos.splice(index, 1, {
      ...newTodos[index],
      isdone: true,
    });

    setTodos(newTodos);
  };
  const changetodoFalse = (id) => {
    const newTodos = [...todos];
    const index = todos.findIndex((todo) => todo.id === id);
    newTodos.splice(index, 1, {
      ...newTodos[index],
      isdone: false,
    }); // newtodos kesip indexden son 1 ayyrya basdaky array uytgetya ...  // {
    //   id: 5,
    //   text: text,
    //   isdone: false,
    // }
    // taze object doredya we isdone uytgetya

    setTodos(newTodos);
  };
  const edit = (id) => {
    console.log(todos);
    const newInput = todos.find((todo) => todo.id === id);
    // console.log(newInput);
    // console.log(newInput.isdone);

    const newArr = todos.filter((todo) => todo.id !== id); //todos arraydan basan indexmizi tapdy we pozdy
    // console.log(newArr);

    setTodos(newArr);
    settodoInput(newInput.text);
  };

  return (
    <div className="leftbar" key={category.id}>
      {todosByCategory
        .filter((todo) => todo.isdone === false)

        .map((todo) => {
          if (todo.id === categoryId) {
          }

          return (
            <div key={todo.id}>
              <div
                className="not-done"
                style={{ display: todo.isdone ? "none" : "flex" }}
              >
                <button
                  className="done-btn"
                  onClick={() => changetodo(todo.id, todo.isdone)}
                >
                  <img
                    alt="NOtdone-icon"
                    className="Notdone-icon"
                    src={NotDoneIcon}
                  />
                </button>

                <p>{todo.text}</p>

                <button className="editbtnIcon" onClick={() => edit(todo.id)}>
                  <img alt="editIcon" src={editIcon} />
                </button>
                <button
                  className="deletebtnIcon"
                  onClick={() => deltext(todo.id)}
                >
                  {" "}
                  <img alt="deleteIcon" src={deleteIcon} />
                </button>
              </div>

              <div
                className="done"
                style={{ display: todo.isdone ? "flex" : "none" }}
              >
                {" "}
                <button
                  className="done-btn"
                  onClick={() => changetodoFalse(todo.id, todo.isdone)}
                >
                  <img alt="done-icon" className="done-icon" src={doneIcon} />
                </button>
                <p
                  style={{ textDecoration: todo.isdone ? "line-through" : "" }}
                >
                  {todo.text}
                </p>{" "}
                <button className="editbtnIcon" onClick={() => edit(todo.id)}>
                  <img alt="editIcon" src={editIcon} />
                </button>
                <button
                  className="deletebtnIcon"
                  onClick={() => deltext(todo.id)}
                >
                  {" "}
                  <img alt="deleteIcon" src={deleteIcon} />
                </button>
              </div>
            </div>
          );
        })}

      {todosByCategory
        .filter((todo) => todo.isdone === true)

        .map((todo) => {
          if (todo.id === categoryId) {
          }

          return (
            <div key={todo.id}>
              <div
                className="not-done"
                style={{ display: todo.isdone ? "none" : "flex" }}
              >
                <button
                  className="done-btn"
                  onClick={() => changetodo(todo.id, todo.isdone)}
                >
                  <img
                    alt="NOtdone-icon"
                    className="Notdone-icon"
                    src={NotDoneIcon}
                  />
                </button>

                <p>{todo.text}</p>

                <button className="editbtnIcon" onClick={() => edit(todo.id)}>
                  <img alt="editIcon" src={editIcon} />
                </button>
                <button
                  className="deletebtnIcon"
                  onClick={() => deltext(todo.id)}
                >
                  {" "}
                  <img alt="deleteIcon" src={deleteIcon} />
                </button>
              </div>

              <div
                className="done"
                style={{ display: todo.isdone ? "flex" : "none" }}
              >
                {" "}
                <button
                  className="done-btn"
                  onClick={() => changetodoFalse(todo.id, todo.isdone)}
                >
                  <img alt="done-icon" className="done-icon" src={doneIcon} />
                </button>
                <p
                  style={{ textDecoration: todo.isdone ? "line-through" : "" }}
                >
                  {todo.text}
                </p>{" "}
                <button className="editbtnIcon" onClick={() => edit(todo.id)}>
                  <img alt="editIcon" src={editIcon} />
                </button>
                <button
                  className="deletebtnIcon"
                  onClick={() => deltext(todo.id)}
                >
                  {" "}
                  <img alt="deleteIcon" src={deleteIcon} />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
