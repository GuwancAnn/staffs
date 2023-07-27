import React, { useState, useEffect } from "react";
import "./style.css";
import supabase from "./client";
import Chart from "./Charts";
import Part from "./Particles";
import Footer from "./Footer";
function Static() {
  const [proCount, setProCount] = useState([]);
  const [magl, setMagl] = useState([]);
  const [countDep, setCountDep] = useState([]);
  const [totol, setTotal] = useState();
  const [proAllCount, setProAllCount] = useState();
  const [staffsAllCount, setstaffsAllCount] = useState([]);

  // const ProAllCountf = async () => {
  //   const { data, count } = await supabase
  //     .from("professions")
  //     .select("*", { count: "exact" });

  //   if (count) {
  //     // console.log(count);
  //     setProAllCount(count);
  //   }
  // };

  const countItem = async () => {
    const { data, error } = await supabase.from("professions").select(`
      *,
      staffs (
        *,professions_id(count)
      )
    `);

    if (data) {
      console.log(data);
      setProCount(data);

      const profflen = data.map((proff) => {
        return proff.staffs.length + proff.staffs.length;
      });
      console.log(profflen[0]);
      setProAllCount(profflen[0]);
      if (error) {
        console.log(error);
      }
    }
  };
  // let tot = 0;
  // let maglumat = [];
  // const countDepf = async () => {
  //   const { data, error } = await supabase.from("departments").select(`
  //     *,
  //     staffs (
  //       *,departments_id(count)
  //     )
  //   `);

  //   if (data) {
  //     data.forEach((el) => {
  //       if (el["dep_name"].includes("kafedra")) tot += el["staffs"].length;
  //       else {
  //         el["sany"] = el["staffs"].length;
  //         maglumat.push(el);
  //       }
  //       maglumat.push({
  //         id: 0,
  //         dep_name: "kafedralar",
  //         staffs: [],
  //         sany: tot,
  //       });
  //       console.log("bah", tot);
  //       console.log(maglumat);
  //       setMagl(maglumat);
  //       console.log(magl);
  //     });

  //     // console.log(magl);
  //     // console.log(data);
  //     setCountDep(data);
  //     console.log(countDep);

  //     // console.log(proCount);
  //     // setTotal(tot);
  //     // data.map((proff) => {
  //     //   console.log(proff.staffs.length);
  //     //   setProCount(proff.staffs.length);
  //     // });

  //     if (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  let tot = 0;
  let maglumat = [];

  const countdepf = async () => {
    const { data, error } = await supabase
      .from("departments")
      .select(`*, staffs (*, departments_id(count))`);

    if (data) {
      data.forEach((el) => {
        if (el["dep_name"].includes("kafedra")) tot += el["staffs"].length;
        else {
          el["sany"] = el["staffs"].length;
          maglumat.push(el);
        }
      });

      maglumat.push({
        id: 0,
        dep_name: "kafedralar",
        staffs: [],
        sany: tot,
      });

      console.log("bah", tot);
      setMagl(maglumat); // Assuming setmagl is a valid function to update
      console.log(magl);
    }
    console.log(maglumat);
  };

  const countStaffs = async () => {
    const { data, count, error } = await supabase
      .from("staffs")
      .select("*", { count: "exact" });

    if (data) {
      // console.log(data);
      setstaffsAllCount(count);

      if (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    countStaffs();
    countdepf();
    countItem();
    // ProAllCountf();
  }, []);

  return (
    <>
      <div className="container">
        <div className="st-flex-col">
          <Part> </Part>
          <div className="numbers-st">
            <div className="numbers-item">
              <p className="number">5</p>
              <p className="num-text">FAKULTETLER</p>
            </div>
            {magl.map((pro) => {
              // console.log(pro.staffs.length);
              // console.log(pro.staffs);
              return (
                <div className="numbers-item" key={pro.id}>
                  <p className="number">{pro.sany}</p>
                  <p className="num-text">{pro.dep_name}</p>
                </div>
              );
            })}
            <div className="numbers-item">
              <p className="number">{staffsAllCount}</p>
              <p className="num-text">AHLI ISGARLER</p>
            </div>
            {/* <div className="numbers-item">
              <p className="number">13</p>
              <p className="num-text">KAFEDRALAR</p>
            </div>{" "}
            <div className="numbers-item">
              <p className="number">30</p>

              <p className="num-text">HOJALYK ISGARLERI</p>
            </div> 
            */}
          </div>
          <div className="numbers-st">
            {" "}
            {proCount.map((pro) => {
              // console.log(pro.staffs.length);
              // console.log(pro.staffs);
              return (
                <div className="numbers-item" key={pro.id}>
                  <p className="number">{pro.staffs.length}</p>
                  <p className="num-text">{pro.title}</p>
                </div>
              );
            })}
            <div className="numbers-item">
              <p className="number">{proAllCount}</p>
              <p className="num-text"> AHLI MUGALLYMLAR</p>
            </div>
          </div>
          {/* /* <div className="numbers-item">
              <p className="number">29</p>
              <p className="num-text">ULY MUGALLYMLAR</p>
            </div>{" "}
            <div className="numbers-item">
              <p className="number">100</p>
              <p className="num-text">OWRENIJI MUGALLYMLAR</p>
            </div>{" "} */}
          <div className="numbers-st">
            <div className="numbers-item">
              <p className="number">16</p>
              <p className="num-text">HUNARMEN TALYPLAR</p>
            </div>
            <div className="numbers-item">
              <p className="number">300</p>
              <p className="num-text">BAKALAWR TALYPLAR</p>
            </div>{" "}
            <div className="numbers-item">
              <p className="number">500</p>
              <p className="num-text">MAGISTR TALYPLAR</p>
            </div>
            <div className="numbers-item">
              <p className="number">500</p>
              <p className="num-text">AHLI TALYPLAR</p>
            </div>
          </div>
        </div>
        <Footer></Footer>{" "}
      </div>
    </>
  );
}
export default Static;
