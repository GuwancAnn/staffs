import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select } from "antd";
import { useRef, useState, useEffect } from "react";
import "./style.css";
import supabase from "./Components/client";

const ProSelect = ({ setNewProID }) => {
  const [items, setItems] = useState([]);

  const [name, setName] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    const departmentData = async () => {
      let { data: professions, error } = await supabase
        .from("professions")
        .select("*");

      if (professions) {
        console.log(professions);
      }
      if (error) {
        console.log(error);
      }

      setItems(professions);
      console.log(items);
    };
    departmentData();
  }, []);

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onSelChange = (id) => {
    console.log(id);

    setNewProID(id);
  };
  const addItem = async (e, id) => {
    e.preventDefault();

    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    const { data: professions } = await supabase.from("professions").insert([
      {
        title: name,
      },
    ]);
    let { data, error } = await supabase.from("professions").select("*");

    if (data) {
      // console.log(professions);
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
      placeholder="Wezipe saylan"
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
        label: item.title,
        value: item.id,
      }))}
    />
  );
};
export default ProSelect;
