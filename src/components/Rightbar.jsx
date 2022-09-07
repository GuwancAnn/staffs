import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import iconList from "../svgphoto/list62251.svg";
export default function Rightbar({ categories, edit, update }) {
  const [Catinput, setCatInput] = useState("");

  return categories.map((category) => {
    return (
      <div key={category.id}>
        <div className="list-items">
          <button
            onDoubleClick={(e) => edit(category.id, category.is_edit)}
            className="editbtn"
          >
            <div className="item" key={category.id}>
              <img alt="ok" src={iconList} />
              <p
                className="list-name"
                style={{
                  display: category.is_edit ? "none" : "block",
                }}
              >
                <Link
                  to={`/${category.id}`}
                  key={category.id}
                  className="cat-name"
                >
                  {category.name}
                </Link>
              </p>
              <input
                className="input-list"
                onKeyPress={(e) =>
                  e.key === "Enter" ? update(Catinput, category.id) : null
                }
                onChange={(e) => setCatInput(e.target.value)}
                style={{
                  display: category.is_edit ? "block" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </div>
    );
  });
}
