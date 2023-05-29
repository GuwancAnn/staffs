import { Button, Modal, Space } from "antd";
import { useState } from "react";
import supabase from "./client";
import "./style.css";
const DeleteModal = ({ staffs, id, setstaffs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
    <>
      <Button type="" onClick={showModal}>
        <svg
          className="delete-btn-icon"
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
        </svg>
      </Button>
      <Modal
        title="Duýduryş!"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="delete-text">Siz bu maglumaty doly pozmak isleýäňizmi?</p>
        <div className="delete-item">
          <div className="free"></div>
          <button onClick={() => deteleBtn(id)} className="delete-btn">
            Pozmak
          </button>
        </div>
      </Modal>
    </>
  );
};
export default DeleteModal;
