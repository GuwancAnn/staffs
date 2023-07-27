import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import EditModal from "./EditModal";
import "./style.css";
import dayjs from "dayjs";
import { Tooltip } from "antd";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import supabase from "./client";
import DeleteModal from "./deleteModal";
dayjs.extend(duration);
dayjs.extend(relativeTime);
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

  // const deteleBtn = async (id) => {
  //   const staffID = staffs.filter((staff) => staff.id !== id);
  //   const { error } = await supabase.from("staffs").delete().eq("id", id);
  //   console.log(id);

  //   if (error) {
  //     console.log(error);
  //   }
  //   setstaffs(staffID);
  // };
  // const countItem = async (id) => {
  //   const { data, error } = await supabase
  //     .from("staffs")
  //     .select("*", { count: "exact" })
  //     .eq("professions_id", `${id}`);
  //   if (data) {
  //     console.log(data.length);
  //     if (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  // countItem();
  return (
    <div>
      <>
        <Table striped bordered hover>
          <thead>
            <tr className="tb-header">
              <th className="tb-head-item-name">
                <p className="center-title-item setting">Ady familiyasy</p>
              </th>
              <th className="tb-head-item ">
                <p className="center-title-item setting"> Işleýän Bölümi</p>
              </th>
              <th className="tb-head-item ">
                <p className="center-title-item setting">Wezipesi</p>
              </th>
              <th className="tb-head-item ">
                <p className="center-title-item setting">Doglan Senesi</p>
              </th>
              <th className="tb-head-item ">
                {" "}
                <p className="archive-text setting">Işe Başlan Senesi</p>
              </th>
              <th className="center-title-item-edit setting"></th>
            </tr>
          </thead>
          <tbody>
            {staffs !== null ? (
              staffs.map((item) => {
                const date1 = dayjs(Currentdate);
                // const dateBtw = date1.diff(item.started_day, "day");
                const dateBtwS = dayjs.duration(dayjs().diff(item.started_day));
                const dateBtwStart = `${dateBtwS.years()} yyl ${dateBtwS.months()} ay ${dateBtwS.days()} gun`;
                const dateBtwB = dayjs.duration(dayjs().diff(item.birthday));
                const dateBtwBirthday = `${dateBtwB.years()} yyl ${dateBtwB.months()} ay ${dateBtwB.days()} gun`;
                return (
                  <tr key={item.id} className="tb-tr">
                    <td>
                      <div className="table-1 ">
                        <p className="">{item.name}</p>
                      </div>
                    </td>
                    <td> {item.departments.dep_name} </td>

                    <td>{item.professions.title} </td>
                    <td>
                      <Tooltip title={dateBtwBirthday}>
                        <p>{item.birthday}</p>
                      </Tooltip>
                    </td>
                    <td>
                      <p>
                        <Tooltip title={dateBtwStart}>
                          {item.started_day}
                        </Tooltip>
                      </p>
                    </td>
                    <td>
                      <div className="edit">
                        <DeleteModal
                          setstaffs={setstaffs}
                          staffs={staffs}
                          id={item.id}
                        ></DeleteModal>
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
                          phone={item.phone_number}
                        ></EditModal>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>Zad yok</p>
            )}
          </tbody>
        </Table>
      </>
    </div>
  );
}

export default EmpTable;
