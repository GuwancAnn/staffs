import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useState } from "react";
import "./style.css";
import supabase from "./client";
const Hdrop = ({ professions, setstaffs, staffs }) => {
  console.log(staffs);
  const fData = async (id) => {
    console.log(id);

    const { data, error } = await supabase
      .from("staffs")
      .select(`*,professions(*),departments(*), professions_id`)
      .filter("professions_id", "in", `(${id})`);
    console.log(data);
    console.log(error);
    setstaffs(data);
  };

  const items = professions.map((profession) => {
    return {
      label: (
        <button className="drop-btn" onClick={() => fData(profession.id)}>
          {profession.title}
        </button>
      ),
    };
  });

  return (
    <Dropdown className="drowdown" menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div className="ant-flex">
            Wezipesi
            <svg
              width="19"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.35837 6.34683C3.71652 6.01541 4.2693 6.01511 4.62781 6.34614L9.00004 10.3834L13.3723 6.34614C13.7308 6.01511 14.2836 6.01541 14.6417 6.34683L14.8039 6.49689C15.2038 6.86701 15.2038 7.49936 14.8039 7.86948L9.63514 12.6526C9.27671 12.9843 8.72338 12.9843 8.36495 12.6526L3.19622 7.86948C2.79626 7.49936 2.79626 6.86701 3.19622 6.49689L3.35837 6.34683Z"
                fill="#282943"
              />
            </svg>
          </div>
        </Space>
      </a>
    </Dropdown>
  );
};
export default Hdrop;
