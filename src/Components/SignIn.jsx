import "../App.css";
import supabase from "./client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tdeiLogo from "../svgphoto/tdei.jpg";
const SignIn = ({ settoken }) => {
  const navigate = useNavigate();
  const [fromData, setFromData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFromData((prevFromData) => {
      return {
        ...prevFromData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const loginBtn = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: fromData.email,
        password: fromData.password,
      });
      if (data.session === null) {
        alert("Parol we Email ýalňyş ");
      } else {
        settoken(data);
        navigate("/emps");
        console.log(data);
        console.log(error);
      }
      // alert("you are signded the WEB SITE");
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="first-logo">
          <img src={tdeiLogo} alt="tdei" className="logo" />
        </div>
        <h1 className="header-text">Hoş geldiniz</h1>
        <p className="sm-text">Içeri girmek üçin dolduryň</p>
        <div className="mail-item">
          <div className="mail-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0254 11.2034C14.7316 11.2034 15.5226 11.3093 16.3983 11.5212C17.274 11.7331 18.072 12.072 18.7924 12.5381C19.5127 13.0042 19.8729 13.548 19.8729 14.1695V16.6271H0V14.1695C0 13.548 0.360169 13.0042 1.08051 12.5381C1.80085 12.072 2.59887 11.7331 3.47458 11.5212C4.35028 11.3093 5.15537 11.2034 5.88983 11.2034C7.30226 11.2034 8.65819 11.5141 9.95763 12.1356C11.2571 11.5141 12.613 11.2034 14.0254 11.2034ZM10.3814 15.2712V14.1695C10.3814 13.887 9.88701 13.548 8.8983 13.1525C7.9096 12.7571 6.89972 12.5593 5.86864 12.5593C4.83757 12.5593 3.82768 12.7571 2.83898 13.1525C1.85028 13.548 1.35593 13.887 1.35593 14.1695V15.2712H10.3814ZM18.5169 15.2712V14.1695C18.5169 13.887 18.0226 13.548 17.0339 13.1525C16.0452 12.7571 15.0424 12.5593 14.0254 12.5593C13.1215 12.5593 12.2034 12.7288 11.2712 13.0678C11.5819 13.4068 11.7373 13.774 11.7373 14.1695V15.2712H18.5169ZM5.88983 10.3136C5.01412 10.3136 4.26554 10.0028 3.64407 9.38136C3.0226 8.75989 2.71186 8.0113 2.71186 7.13559C2.71186 6.25989 3.0226 5.51836 3.64407 4.91102C4.26554 4.30367 5.01412 4 5.88983 4C6.76554 4 7.50706 4.30367 8.11441 4.91102C8.72175 5.51836 9.02542 6.25989 9.02542 7.13559C9.02542 8.0113 8.72175 8.75989 8.11441 9.38136C7.50706 10.0028 6.76554 10.3136 5.88983 10.3136ZM5.86864 5.35593C5.37429 5.35593 4.95056 5.53249 4.59746 5.88559C4.24435 6.2387 4.0678 6.66243 4.0678 7.15678C4.0678 7.65113 4.24435 8.07486 4.59746 8.42797C4.95056 8.78107 5.37429 8.95763 5.86864 8.95763C6.36299 8.95763 6.78672 8.78107 7.13983 8.42797C7.49294 8.07486 7.66949 7.65113 7.66949 7.15678C7.66949 6.66243 7.49294 6.2387 7.13983 5.88559C6.78672 5.53249 6.36299 5.35593 5.86864 5.35593ZM14.0254 10.3136C13.1497 10.3136 12.4011 10.0028 11.7797 9.38136C11.1582 8.75989 10.8475 8.0113 10.8475 7.13559C10.8475 6.25989 11.1582 5.51836 11.7797 4.91102C12.4011 4.30367 13.1497 4 14.0254 4C14.9011 4 15.6427 4.30367 16.25 4.91102C16.8573 5.51836 17.161 6.25989 17.161 7.13559C17.161 8.0113 16.8573 8.75989 16.25 9.38136C15.6427 10.0028 14.9011 10.3136 14.0254 10.3136ZM14.0042 5.35593C13.5099 5.35593 13.0862 5.53249 12.7331 5.88559C12.3799 6.2387 12.2034 6.66243 12.2034 7.15678C12.2034 7.65113 12.3799 8.07486 12.7331 8.42797C13.0862 8.78107 13.5099 8.95763 14.0042 8.95763C14.4986 8.95763 14.9223 8.78107 15.2754 8.42797C15.6285 8.07486 15.8051 7.65113 15.8051 7.15678C15.8051 6.66243 15.6285 6.2387 15.2754 5.88559C14.9223 5.53249 14.4986 5.35593 14.0042 5.35593Z"
                fill="#D0D0D0"
              />
            </svg>
          </div>
          <form onSubmit={loginBtn} className="form-label">
            <input
              name="email"
              placeholder="Ulanyjy ady"
              className="gozleg"
              onChange={handleChange}
            />{" "}
            <input
              name="password"
              placeholder="Açar söz"
              className="gozleg"
              onChange={handleChange}
            />
            <button type="sumbit" className="giris-btn">
              {" "}
              Içeri Girmek
            </button>
          </form>
        </div>
        <div className="mail-item">
          <div className="password-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 9.16663H4.16667C3.24619 9.16663 2.5 9.91282 2.5 10.8333V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V10.8333C17.5 9.91282 16.7538 9.16663 15.8333 9.16663Z"
                stroke="#D0D0D0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.83337 9.16663V5.83329C5.83337 4.72822 6.27236 3.66842 7.05376 2.88701C7.83516 2.10561 8.89497 1.66663 10 1.66663C11.1051 1.66663 12.1649 2.10561 12.9463 2.88701C13.7277 3.66842 14.1667 4.72822 14.1667 5.83329V9.16663"
                stroke="#D0D0D0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <Link to={"/"} className="agza">
          Agza bolmak
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
