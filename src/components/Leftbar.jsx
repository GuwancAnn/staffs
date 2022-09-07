import React from "react";
import "../App.css";

import { MainContext, useContext } from "../context.js";
import { useParams } from "react-router-dom";
import TodoList from "../components/TodoList.jsx";

export default function Leftbar() {
  const {
    categories,
    todos,
    settodoInput,

    todoinput,
    addtext,
    plusIcon,
  } = useContext(MainContext);

  const params = useParams();
  // console.log(params);access the parameters of the current route.
  const categoryId = parseInt(params.categoryId);

  const category = categories.find((category) => category.id === categoryId);

  const todosByCategory =
    todos.filter((todo) => todo.category_id === categoryId) ?? [];

  // []error berenok
  console.log(todosByCategory);

  return (
    <div>
      <div className="left-name">
        <h1>{category.name}</h1> <hr className="line"></hr>
      </div>
      <TodoList
        todosByCategory={todosByCategory}
        category={category}
        categoryId={categoryId}
      ></TodoList>

      <div className="new-todo">
        <input
          className="new-text"
          type={"text"}
          value={todoinput}
          onKeyPress={(e) =>
            e.key === "Enter" ? addtext(todoinput, categoryId) : null
          }
          onChange={(e) => settodoInput(e.target.value)}
        />
        <button
          className="addTodoBtn"
          onClick={() => addtext(todoinput, categoryId)}
        >
          <img alt="plus" className="plusIcon" src={plusIcon} />
        </button>
      </div>
    </div>
  );
}
