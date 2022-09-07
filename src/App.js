import "./App.css";
import { MainContext } from "./context.js";
import newIcon from "./svgphoto/Vector.svg";
import plusIcon from "./svgphoto/Group428.svg";
import React, { useState } from "react";
import Rightbar from "./components/Rightbar.jsx";
import { Outlet } from "react-router-dom";
const App = () => {
  const [categories, setCategories] = useState([
    {
      name: "New List",
      id: 1,
      is_edit: false,
    },
  ]); // object doredya

  const [todos, setTodos] = useState([]);
  const [todoinput, settodoInput] = useState("");
  const addtext = (text, categoryId) => {
    if (todoinput === "") {
      alert("soz yazyn");
    } else {
      setTodos((prev) => {
        return [
          {
            id: prev.length + 1,
            category_id: categoryId,
            text: todoinput,
            isdone: false,
          },
          ...prev,
        ];
      });
      // console.log(prev);
      settodoInput("");
    }
  }; // object doredip icine todo gosya ... esasy  bilmeli zad funksiyada nameler gerek ...property name bermeli

  const data = {
    categories,
    setCategories,
    todos,
    setTodos,
    settodoInput,
    todoinput,
    addtext,
    plusIcon,
  };

  const newList = () => {
    setCategories((prev) => {
      return [
        ...prev,
        {
          name: "New List",
          id: Math.floor(Math.random(100) * 1000),
          is_edit: false,
        },
      ];
    });
    // setleftName(categories);
    // console.log(categories);
  }; // obeject doredya taze list

  const editCategory = (id) => {
    categories.find((category) => category.id === id);
    // find clicked category from categories
    // set is_edit attribute to true
    const newCatPush = [...categories];
    const index = categories.findIndex((category) => category.id === id);
    newCatPush.splice(index, 1, {
      ...newCatPush[index],
      is_edit: true,
    });

    setCategories(newCatPush);
  };

  const updateCategory = (Catinput, id) => {
    // update category with provided name
    const newCat = [...categories];
    const index = categories.findIndex((category) => category.id === id);
    newCat.splice(index, 1, {
      ...newCat[index],
      is_edit: false,
      name: Catinput,
    });
    setCategories(newCat);
    // setleftName(newCat);
    console.log(newCat);
  };
  return (
    <>
      <MainContext.Provider value={data}>
        <div className="container">
          <div className="right-bar ">
            <div className="logo">
              <h1>Todo List</h1>
            </div>

            <Rightbar
              categories={categories}
              edit={editCategory}
              update={updateCategory}
            ></Rightbar>
            <div className="new-list">
              <div className="free"></div>

              <button onClick={newList} className="new-btn">
                <img alt="icon " src={newIcon} />
                <p className="new-name">New List</p>
              </button>
            </div>
          </div>
          <div className="left-bar">
            <Outlet />
          </div>
        </div>
      </MainContext.Provider>
    </>
  );
};

export default App;
