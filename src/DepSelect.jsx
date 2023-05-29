import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select } from "antd";
import { useRef, useState, useEffect } from "react";
import "./style.css";
import supabase from "./Components/client";

const DepSelect = ({ setNewDepId }) => {
  const [items, setItems] = useState([]);

  const [name, setName] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
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

      setItems(departments);
      console.log(items);
    };
    departmentData();
  }, []);

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onSelChange = (id) => {
    console.log(id);
    // const itemID = items.find((item_id) => item_id);

    setNewDepId(id);
    //   console.log(itemID);
  };
  const addItem = async (e, id) => {
    e.preventDefault();

    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    const { data: departments } = await supabase.from("departments").insert([
      {
        dep_name: name,
      },
    ]);
    let { data, error } = await supabase.from("departments").select("*");

    if (data) {
      // console.log(departments);
    }
    if (error) {
      console.log(error);
    }

    setItems(data);
    console.log(items);
  };

  return (
    <Select
      onChange={onSelChange}
      style={{
        width: "54%",
      }}
      placeholder="Kafedra saýlaň"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: "8px 0",
            }}
          />
          <Input
            className="newdep-input"
            placeholder="Please enter item"
            ref={inputRef}
            value={name}
            onChange={onNameChange}
          />
          <Button
            type="text"
            icon={<PlusOutlined />}
            className="new-dep-btn"
            onClick={addItem}
          >
            Add item
          </Button>
          {console.log(items)}
        </>
      )}
      options={items.map((item) => ({
        label: item.dep_name,
        value: item.id,
      }))}
    />
  );
};
export default DepSelect;
