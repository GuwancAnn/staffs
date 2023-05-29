import React, { useState, useEffect } from "react";
import Wdrop from "./DropDown";
import Hdrop from "./HDropDown";
import EmpTable from "./EmpTable";
import "../style.css";
import DataPicker from "./Datapicker";
import supabase from "./client";
import AddEmp from "../AddEmp";
import { useNavigate } from "react-router-dom";

export default function Employes() {
  const [staffs, setStaffs] = useState([]);

  const [professions, setProfessions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const staffsData = async () => {
      let { data, error } = await supabase
        .from("staffs")
        .select(`*,professions(*),departments(*)`);

      if (data) {
        console.log(data);
      }
      if (error) {
        console.log(error);
      }
      setStaffs(data ? data : []);
    };
    staffsData();
    console.log(staffs);
    const departmentData = async () => {
      let { data: departments, error } = await supabase
        .from("departments")
        .select("*");

      if (departments) {
        console.log(departments);
      }
      if (error) {
        console.log(error);
      }
      setDepartments(departments ? departments : []);
    };
    departmentData();

    const professionsData = async () => {
      let { data: professions, error } = await supabase
        .from("professions")
        .select("*");

      if (professions) {
        console.log(professions);
      }
      if (error) {
        console.log(error);
      }
      setProfessions(professions ? professions : []);
    };
    professionsData();
  }, []);
  const resetFilter = async () => {
    const staffsData = async () => {
      let { data, error } = await supabase
        .from("staffs")
        .select(`*,professions(*),departments(*)`);

      if (data) {
        console.log(data);
      }
      if (error) {
        console.log(error);
      }
      setStaffs(data ? data : []);
    };
    staffsData();
    console.log(staffs);
    const departmentData = async () => {
      let { data: departments, error } = await supabase
        .from("departments")
        .select("*");

      if (departments) {
        console.log(departments);
      }
      if (error) {
        console.log(error);
      }
      setDepartments(departments ? departments : []);
    };
    departmentData();

    const professionsData = async () => {
      let { data: professions, error } = await supabase
        .from("professions")
        .select("*");

      if (professions) {
        console.log(professions);
      }
      if (error) {
        console.log(error);
      }
      setProfessions(professions ? professions : []);
    };
    professionsData();
  };

  const searchTextF = async (e) => {
    console.log(searchText);
    console.log(e.target.value);

    // if (searc == "") {
    //   console.log(searchText);
    // } else {
    const { data, error } = await supabase
      .from("staffs")
      .select(`*,professions(*),departments(*)`)

      .ilike("name", `${e.target.value}%`);

    if (data) {
      console.log(data);
      console.log(e.target.value);
    } else {
      console.log(error);
    }
    setStaffs(data);
    console.log(searchText);
    console.log(e.target.value);
    // }
  };

  //setPositions(staffs.positions);
  console.log(staffs);
  const navigate = useNavigate();
  const addEmp = (props) => {
    navigate("/addEmp");
    console.log(props);
  };

  return (
    <div className="container1">
      <div className="top-filter">
        <input
          type="text"
          placeholder="Gozleg..."
          value={searchText}
          className="input-filter"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={((e) => e.key == "Enter") && searchTextF}
          // onSubmit={setSearchText()}
        />
        <button onClick={searchTextF} className="search-btn">
          {" "}
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            className="search-icon"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.1955 14.3096C15.8932 14.0067 15.4828 13.8365 15.0548 13.8365C14.8461 13.8365 14.6456 13.7556 14.4955 13.6107L14.3774 13.4969C15.6101 12.0629 16.3522 10.2013 16.3522 8.1761C16.3522 3.66038 12.6918 0 8.1761 0C3.66038 0 0 3.66038 0 8.1761C0 12.6918 3.66038 16.3522 8.1761 16.3522C10.2013 16.3522 12.0629 15.6101 13.4969 14.3774L13.6107 14.4955C13.7556 14.6456 13.8365 14.8461 13.8365 15.0548C13.8365 15.4828 14.0067 15.8932 14.3096 16.1955L19.1877 21.0638C19.706 21.581 20.5452 21.5806 21.0629 21.0629C21.5806 20.5452 21.581 19.706 21.0638 19.1877L16.1955 14.3096ZM8.1761 13.8365C5.04403 13.8365 2.51572 11.3082 2.51572 8.1761C2.51572 5.04403 5.04403 2.51572 8.1761 2.51572C11.3082 2.51572 13.8365 5.04403 13.8365 8.1761C13.8365 11.3082 11.3082 13.8365 8.1761 13.8365Z"
              fill="#9998A5"
            />
          </svg>
        </button>
        <Wdrop
          departments={departments}
          staffs={staffs}
          setstaffs={setStaffs}
        ></Wdrop>
        <Hdrop
          professions={professions}
          staffs={staffs}
          setstaffs={setStaffs}
        ></Hdrop>
        <DataPicker staffs={staffs} setstaffs={setStaffs}></DataPicker>
        <button className="clear-btn" onClick={resetFilter}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.6254 0.0832405C13.458 0.129751 13.2022 0.236731 13.058 0.320452C12.6719 0.557665 0.439215 12.8183 0.26712 13.1439C-0.0817218 13.809 -0.086373 14.6788 0.253166 15.3718C0.402006 15.6695 0.583403 15.8648 2.40668 17.6788C4.20671 19.4695 4.42531 19.6695 4.68113 19.7812C4.83927 19.8509 5.07649 19.93 5.21137 19.9533C5.36951 19.9812 7.87652 19.9998 12.0812 19.9998C19.3604 19.9998 18.8999 20.0184 19.1325 19.7114C19.4069 19.3533 19.2953 18.8695 18.886 18.6649L18.6813 18.5579H13.4208H8.1649L13.8906 12.8276C18.2674 8.43684 19.6441 7.03682 19.7371 6.85542C20.0674 6.21821 20.086 5.37168 19.7837 4.67865C19.672 4.42283 19.472 4.20423 17.6813 2.4042C15.8673 0.580921 15.672 0.399523 15.3743 0.250685C14.8394 -0.0097847 14.2208 -0.0702515 13.6254 0.0832405ZM14.7371 1.52977C14.951 1.6414 18.3836 5.08331 18.486 5.28796C18.5836 5.48331 18.5836 5.95774 18.486 6.15309C18.4069 6.31123 12.9417 11.8136 12.8626 11.8136C12.8022 11.8136 8.18815 7.19961 8.18815 7.13915C8.18815 7.06473 13.6347 1.64605 13.8161 1.53907C14.0347 1.40884 14.4952 1.40419 14.7371 1.52977ZM9.4998 10.4973C10.7742 11.7718 11.8161 12.8322 11.8161 12.8602C11.8161 12.9392 6.31371 18.4044 6.15557 18.4835C5.94626 18.5905 5.48579 18.5812 5.26719 18.4695C5.05323 18.3579 1.62063 14.916 1.5183 14.7113C1.42062 14.516 1.42062 14.0416 1.5183 13.8462C1.59737 13.6881 7.06256 8.18567 7.14163 8.18567C7.16489 8.18567 8.23001 9.22755 9.4998 10.4973Z"
              fill="#9998A5"
            />
          </svg>
        </button>
        <button onClick={addEmp} className="add-btn">
          {" "}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="8.5" x2="8.5" y2="16" stroke="#9998A5" />
            <line y1="8.0332" x2="16" y2="8.0332" stroke="#9998A5" />
          </svg>
        </button>
      </div>
      <EmpTable
        staffs={staffs}
        setstaffs={setStaffs}
        setDepartments={setDepartments}
        departments={departments}
        professions={professions}
      ></EmpTable>
    </div>
  );
}
