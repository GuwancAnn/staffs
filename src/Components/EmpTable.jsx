import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import EditModal from "./EditModal";
import "./style.css";
import dayjs from "dayjs";
import { Tooltip } from "antd";

import supabase from "./client";
function EmpTable({
  staffs,
  setstaffs,
  setDepartments,
  departments,
  professions,
}) {
  console.log(staffs);
  const navigate = useNavigate();
  let today = new Date();

  let Currentdate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  dayjs().format("YYYY-MM-DD");

  const deteleBtn = async (id) => {
    const staffID = staffs.filter((staff) => staff.id !== id);
    const { error } = await supabase.from("staffs").delete().eq("id", id);
    console.log(id);

    if (error) {
      console.log(error);
    }
    setstaffs(staffID);
  };

  return (
    <div>
      <>
        <Table striped bordered hover>
          <thead>
            <tr className="tb-header">
              {/* <th className="tb-head-item-num">
            <p className="center-title-item setting">T/B</p>
          </th> */}
              <th className="tb-head-item-name">
                <p className="center-title-item setting">Ady familiyasy</p>
              </th>
              <th className="tb-head-item "> Işleýän Bölümi</th>
              <th className="tb-head-item ">Wezipesi</th>
              <th className="tb-head-item ">
                <p className="center-title-item setting">Doglan Senesi</p>
              </th>
              <th className="tb-head-item ">
                {" "}
                <p className="archive-text setting">Ise Baslan Senesi</p>
              </th>
              <th className="center-title-item-edit setting"></th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((item) => {
              const date1 = dayjs(Currentdate);
              const dateBtw = date1.diff(item.started_day, "day");
              const dateBtwMonth = date1.diff(item.started_day, "month");
              const dateBtwYear = date1.diff(item.started_day, "year");
              const dateBwFull =
                dateBtw + " gun " + dateBtwMonth + " ay " + dateBtwYear;

              console.log(staffs);
              return (
                <tr key={item.id} className="tb-tr">
                  <td>
                    <div className="table-1 ">
                      <p className="">{item.name}</p>
                    </div>
                  </td>
                  <td> {item.departments.dep_name} kaferdasy</td>

                  <td>{item.professions.title} </td>
                  <td>
                    <p>{item.birthday}</p>
                  </td>
                  <td>
                    <p>
                      <Tooltip title={dateBwFull + " yyl "}>
                        {item.started_day}
                      </Tooltip>
                    </p>
                  </td>
                  <td>
                    <div className="edit">
                      <button
                        onClick={() => deteleBtn(item.id)}
                        className="delete-btn"
                      >
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="delete_forever_24px">
                            <path
                              id="icon/action/delete_forever_24px"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M14.5 3L15.5 4H19V6H5V4H8.5L9.5 3H14.5ZM12 12.59L14.12 10.47L15.53 11.88L13.41 14L15.53 16.12L14.12 17.53L12 15.41L9.88 17.53L8.47 16.12L10.59 14L8.46 11.88L9.87 10.47L12 12.59ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM16 9H8V19H16V9Z"
                              fill="#0081BF"
                            />
                          </g>
                        </svg>{" "}
                      </button>
                      <EditModal
                        staffs={staffs}
                        id={item.id}
                        name={item.name}
                        setstaffs={setstaffs}
                        department={item.departments.id}
                        profession={item.professions.id}
                        professions={professions}
                        birthday={item.birthday}
                        startedday={item.started_day}
                        work={item.working_for}
                        languages={item.languages}
                        choices={item.choices}
                        country={item.another_country}
                        party={item.party_member}
                        deputy={item.deputy}
                        setDepartments={setDepartments}
                        departments={departments}
                        prev={item.prev_places}
                      ></EditModal>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    </div>
  );
}

export default EmpTable;
