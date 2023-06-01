import { Button, Modal, DatePicker } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import supabase from "./client";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

import "./style.css";
import { Select } from "antd";

const { Option } = Select;

const EditModal = ({
  staffs,
  id,
  name,
  setstaffs,
  profession,
  phone,
  department,
  professions,
  birthday,
  startedday,
  work,
  languages,
  choices,
  country,
  party,
  deputy,
  departments,
  prev,
}) => {
  const [open, setOpen] = useState(false);
  const [findStaffs, setfindStaffs] = useState([]);
  const [profileUrl, setProfileUrl] = useState("");
  const [upBirthday, setupBirthday] = useState(birthday);
  const [profile, setProfile] = useState();
  const [NewDepId, setNewDepId] = useState();
  const [NewProId, setNewProID] = useState();

  const [upStartedDay, setupStartedDay] = useState(startedday);
  // useEffect(() => {
  //   const staffsData = async () => {
  //     let { data: staffs } = await supabase.from("staffs").select("profile");
  //     if (staffs) {
  //       console.log(staffs);
  //       setProfileID(staffs);
  //     }
  //     // let { data, error } = await supabase.storage
  //     //   .from("images")
  //     //   .download("6f6a8f3d-04ef-4723-b290-9db865194dd9-download.jpeg");

  //     // const bucket = supabase.storage.from("images");
  //     // const { data: publicUrl } = bucket.getPublicUrl(
  //     //   "6f6a8f3d-04ef-4723-b290-9db865194dd9-download.jpeg"
  //     // );
  //     // console.log(publicUrl);

  //     if (data) {
  //       console.log(data);
  //       // setFileUrl(URL.createObjectURL(data));
  //       // console.log(fileUrl);
  //     }
  //     if (error) {
  //       console.log(error);
  //     }
  //   };
  //   staffsData();
  // }, []);
  const handleChangeDep = (value) => {
    setNewDepId(value.key);
    console.log(value);
  };
  const handleChangePro = (value) => {
    setNewProID(value.key);
    console.log(value);
  };
  const {
    register,
    handleSubmit,
    getValues,

    formState: { errors },
  } = useForm();

  const exit = async () => {
    setOpen(false);
  };
  const profilePhoto = async (e) => {
    const selectedPhoto = e.target.files[0];
    console.log(selectedPhoto);
    const selectedPhotoArr = Array.from(selectedPhoto);

    const imagesArr = URL.createObjectURL(selectedPhoto);

    setProfile(imagesArr);
    console.log(profile);
    const upladReady = `${uuidv4()}-${selectedPhoto.name}`;
    console.log(upladReady);
    const { data: images } = await supabase.storage
      .from("images")
      .upload(upladReady, selectedPhoto, {
        cacheControl: "3600",
        upsert: false,
      });

    const bucket = supabase.storage.from("images");
    const imagePath = upladReady;
    const { data: publicUrl, error } = bucket.getPublicUrl(imagePath);
    if (error) {
      console.log("Error getting public URL:", error.message);
    } else {
      console.log(publicUrl.publicUrl);
      setProfileUrl(publicUrl.publicUrl);
      // console.log(profileUrl);
    }

    const { data: staffs } = await supabase
      .from("staffs")
      .update({
        profile_photo: publicUrl.publicUrl,
      })
      .eq("id", id);
    const { data } = await supabase.from("staffs").select("profile_photo");
    if (data) {
      setProfileUrl(data);
    }
  };
  const onSubmit = async (data, key) => {
    setOpen(false);
    const { data: staffs, error } = await supabase
      .from("staffs")
      .update({
        ...getValues,
        name: getValues("name"),
        professions_id: NewProId,
        departments_id: NewDepId,
        birthday: upBirthday,
        started_day: upStartedDay,
        working_for: getValues("working_for"),
        languages: getValues("languages"),
        choices: getValues("choices"),
        another_country: getValues("another_country"),
        deputy: getValues("deputy"),
        party_member: getValues("party_member"),
      })
      .eq("id", id);

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
      setstaffs(data ? data : []);
    };
    staffsData();

    if (error) {
      console.log(error);
    }
  };

  const findItem = async (id) => {
    setOpen(true);
    // console.log(open);

    const staffID = staffs.filter((staff) => staff.id === id);
    setfindStaffs(staffID);
    console.log(staffID);
    console.log(staffs);
  };

  const onchangeBirthday = (dateString) => {
    setupBirthday(dateString);
  };
  const onchangeStartDay = (dateString) => {
    setupStartedDay(dateString);
  };

  return (
    <>
      <Button onClick={() => findItem(id)} className="edit-btn">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="border_color_24px">
            <path
              id="icon/editor/border_color_24px"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.71 4.04207C21.1 3.65211 21.1 3.02217 20.71 2.63221L18.37 0.292455C18.1832 0.105222 17.9295 0 17.665 0C17.4005 0 17.1468 0.105222 16.96 0.292455L15 2.25225L18.75 6.00186L20.71 4.04207ZM4 13.2511L14 3.25215L17.75 7.00176L7.75 17.0007H4V13.2511ZM6 15.0009H6.92L14.92 7.00176L14 6.08186L6 14.081V15.0009ZM24 20.0004H0V24H24V20.0004Z"
              fill="#0081BF"
            />
          </g>
        </svg>
      </Button>
      <Modal centered open={open} onCancel={() => exit()} width={1000}>
        {findStaffs.map((item) => (
          <div className="container1 " key={item.id}>
            {" "}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="img-add">
                {console.log(item.profile_photo)}
                <label className="photo-upload">
                  <input
                    type="file"
                    accept="image/*"
                    src={item.profile_photo}
                    onChange={profilePhoto}
                    name="images"
                    id=""
                    className="choose-file"
                  />
                  {profile ? (
                    <img src={profile} className="photo-upload" />
                  ) : (
                    <img src={item.profile_photo} className="photo-upload" />
                  )}
                </label>
                {/* img src={item.profile_photo} className="photo-upload" /> */}
                {console.log(item)}
              </div>
              <div className="Ad-text">
                <div className="ad-text-item">
                  <p className="ad-title">Ady Familiýasy</p>
                  <input
                    type="text"
                    // {...register:"name",{value:"name"}}
                    {...register("name", { value: name })}
                    className="ad-input"
                  />
                </div>
                <div className="ad-text-item">
                  <p className="ad-title">Işleyän ýeri</p>
                  <textarea
                    className="text-area"
                    {...register("working_for", { value: work })}
                  ></textarea>
                </div>
                <div className="ad-text-item">
                  <p className="ad-title">Wezipesi</p>

                  <Select
                    labelInValue
                    defaultValue={{
                      value: profession,
                      label: item.professions.title,
                    }}
                    style={{
                      width: 120,
                    }}
                    onChange={handleChangePro}
                    options={professions.map((item) => ({
                      label: item.title,
                      value: item.id,
                    }))}
                  />
                  {console.log(profession, item.professions_id)}
                </div>
                <div className="ad-text-item">
                  <p className="ad-title">Işleyän bölümi</p>

                  <Select
                    labelInValue
                    defaultValue={{
                      value: department,
                      label: item.departments.dep_name,
                    }}
                    style={{
                      width: 120,
                    }}
                    onChange={handleChangeDep}
                    options={departments.map((item) => ({
                      label: item.dep_name,
                      value: item.id,
                    }))}
                  />
                  {console.log(department, item.departments_id)}
                </div>
                <div className="ad-text-item-date">
                  <DatePicker
                    defaultValue={dayjs(birthday)}
                    onChange={onchangeBirthday}
                    className="data-pic-add"
                    suffixIcon={
                      <svg
                        width="23"
                        height="22"
                        viewBox="0 0 23 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.5723 8.21052C5.36731 8.27323 5.10403 8.5548 5.04483 8.77461C4.94184 9.15695 5.09486 9.55882 5.42053 9.76121C5.66454 9.91286 6.08467 9.90666 6.32468 9.74788C6.59321 9.57021 6.70326 9.35999 6.70326 9.02462C6.70326 8.69354 6.59342 8.47915 6.33694 8.30948C6.15243 8.18738 5.79785 8.14149 5.5723 8.21052Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M9.31505 8.21052C9.11006 8.27323 8.84677 8.5548 8.78758 8.77461C8.68459 9.15695 8.83761 9.55882 9.16327 9.76121C9.40728 9.91286 9.82742 9.90666 10.0674 9.74788C10.336 9.57021 10.446 9.35999 10.446 9.02462C10.446 8.69354 10.3362 8.47915 10.0797 8.30948C9.89517 8.18738 9.5406 8.14149 9.31505 8.21052Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M13.0578 8.21052C12.8528 8.27323 12.5895 8.5548 12.5303 8.77461C12.4273 9.15695 12.5804 9.55882 12.906 9.76121C13.15 9.91286 13.5702 9.90666 13.8102 9.74788C14.0787 9.57021 14.1888 9.35999 14.1888 9.02462C14.1888 8.69354 14.0789 8.47915 13.8224 8.30948C13.6379 8.18738 13.2833 8.14149 13.0578 8.21052Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M16.8005 8.21052C16.5956 8.27323 16.3323 8.5548 16.2731 8.77461C16.1701 9.15695 16.3231 9.55882 16.6488 9.76121C16.8928 9.91286 17.3129 9.90666 17.5529 9.74788C17.8215 9.57021 17.9315 9.35999 17.9315 9.02462C17.9315 8.69354 17.8217 8.47915 17.5652 8.30948C17.3807 8.18738 17.0261 8.14149 16.8005 8.21052Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M5.5723 11.9522C5.36731 12.0149 5.10403 12.2965 5.04483 12.5163C4.94184 12.8986 5.09486 13.3005 5.42053 13.5029C5.66454 13.6545 6.08467 13.6483 6.32468 13.4896C6.59321 13.3119 6.70326 13.1017 6.70326 12.7663C6.70326 12.4352 6.59342 12.2208 6.33694 12.0512C6.15243 11.9291 5.79785 11.8832 5.5723 11.9522Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M9.31505 11.9522C9.11006 12.0149 8.84677 12.2965 8.78758 12.5163C8.68459 12.8986 8.83761 13.3005 9.16327 13.5029C9.40728 13.6545 9.82742 13.6483 10.0674 13.4896C10.336 13.3119 10.446 13.1017 10.446 12.7663C10.446 12.4352 10.3362 12.2208 10.0797 12.0512C9.89517 11.9291 9.5406 11.8832 9.31505 11.9522Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M5.5723 15.6939C5.36731 15.7566 5.10403 16.0382 5.04483 16.258C4.94184 16.6403 5.09486 17.0422 5.42053 17.2446C5.66454 17.3962 6.08467 17.39 6.32468 17.2312C6.59321 17.0536 6.70326 16.8434 6.70326 16.508C6.70326 16.1769 6.59342 15.9625 6.33694 15.7928C6.15243 15.6707 5.79785 15.6249 5.5723 15.6939Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M9.31505 15.6939C9.11006 15.7566 8.84677 16.0382 8.78758 16.258C8.68459 16.6403 8.83761 17.0422 9.16327 17.2446C9.40728 17.3962 9.82742 17.39 10.0674 17.2312C10.336 17.0536 10.446 16.8434 10.446 16.508C10.446 16.1769 10.3362 15.9625 10.0797 15.7928C9.89517 15.6707 9.5406 15.6249 9.31505 15.6939Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M13.0676 11.9522C12.8626 12.0149 12.5993 12.2965 12.5401 12.5163C12.4372 12.8986 12.5902 13.3005 12.9158 13.5029C13.1599 13.6546 13.58 13.6484 13.82 13.4896C14.0885 13.3119 14.1986 13.1017 14.1986 12.7663C14.1986 12.4352 14.0887 12.2208 13.8323 12.0512C13.6477 11.9291 13.2932 11.8832 13.0676 11.9522Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M16.8104 11.9522C16.6054 12.0149 16.3421 12.2965 16.2829 12.5163C16.1799 12.8986 16.3329 13.3005 16.6586 13.5029C16.9026 13.6546 17.3227 13.6484 17.5627 13.4896C17.8313 13.3119 17.9413 13.1017 17.9413 12.7663C17.9413 12.4352 17.8315 12.2208 17.575 12.0512C17.3905 11.9291 17.0359 11.8832 16.8104 11.9522Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M12.5401 16.258C12.5993 16.0382 12.8626 15.7566 13.0676 15.6939C13.2932 15.6249 13.6477 15.6708 13.8323 15.7929C14.0887 15.9625 14.1986 16.1769 14.1986 16.508C14.1986 16.8434 14.0885 17.0536 13.82 17.2313C13.58 17.39 13.1599 17.3962 12.9158 17.2446C12.5902 17.0422 12.4372 16.6403 12.5401 16.258Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M16.8104 15.6939C16.6054 15.7566 16.3421 16.0382 16.2829 16.258C16.1799 16.6403 16.3329 17.0422 16.6586 17.2446C16.9026 17.3962 17.3227 17.39 17.5627 17.2313C17.8313 17.0536 17.9413 16.8434 17.9413 16.508C17.9413 16.1769 17.8315 15.9625 17.575 15.7929C17.3905 15.6708 17.0359 15.6249 16.8104 15.6939Z"
                          fill="#9998A5"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.5723 0.0390281C5.37897 0.0981639 5.10532 0.382403 5.05004 0.581529C5.02496 0.67176 5.00435 0.961289 5.00422 1.22488L5.00396 1.70416L4.17582 1.7236C3.43416 1.74102 3.30725 1.75517 2.96051 1.85899C1.85747 2.18925 0.974786 3.07014 0.628474 4.18623L0.508362 4.5733V19.153L0.628474 19.54C0.974054 20.6539 1.84633 21.5259 2.96051 21.8714L3.34769 21.9915L19.6523 21.9915L20.0395 21.8714C21.1537 21.5259 22.0259 20.6539 22.3715 19.5401L22.4916 19.153L22.4916 4.5733L22.3715 4.18623C22.0252 3.07022 21.1428 2.18951 20.0395 1.85891C19.6907 1.75435 19.5684 1.74093 18.8068 1.72365L17.9612 1.70446L17.9464 1.13577C17.9324 0.603463 17.9241 0.555983 17.8161 0.392854C17.6383 0.124442 17.428 0.0144707 17.0926 0.0144707C16.7572 0.0144707 16.5469 0.124442 16.3691 0.392854C16.261 0.556155 16.2528 0.603162 16.2387 1.1402L16.2238 1.71328H12.3258L12.3108 1.14343C12.2974 0.633268 12.2852 0.55637 12.1938 0.409412C12.1376 0.319095 12.0132 0.193297 11.9173 0.129861C11.7725 0.0340822 11.6949 0.0144707 11.4601 0.0144707C11.1213 0.0144707 10.9119 0.123539 10.7335 0.392854C10.6254 0.556155 10.6171 0.603162 10.6031 1.1402L10.5881 1.71328H6.7332L6.71823 1.1402C6.7042 0.603162 6.69598 0.556155 6.58783 0.392854C6.52438 0.297032 6.40371 0.176137 6.31973 0.12427C6.14399 0.0156749 5.7831 -0.0254836 5.5723 0.0390281ZM19.4372 20.2712L10.6349 20.3132L3.56279 20.2712L3.31534 20.1713C2.83721 19.9783 2.4752 19.5997 2.30647 19.1164C2.2333 18.9067 2.22917 18.5193 2.22917 11.8631C2.22917 5.20698 2.2333 4.81952 2.30647 4.6099C2.4758 4.12477 2.84126 3.74368 3.31534 3.55789C3.5276 3.47471 3.6647 3.45837 4.27907 3.44301L4.99531 3.42508L5.01041 3.99919C5.02392 4.51378 5.03605 4.59033 5.12756 4.73746C5.1837 4.82778 5.30816 4.95358 5.40405 5.01701C5.54933 5.11314 5.6262 5.13241 5.86436 5.13241C6.10252 5.13241 6.1794 5.11314 6.32468 5.01701C6.42057 4.95358 6.54503 4.82778 6.60117 4.73746C6.69254 4.59051 6.7048 4.51361 6.71823 4.00345L6.7332 3.43359H10.5881L10.6031 4.00667C10.6171 4.54371 10.6254 4.59072 10.7335 4.75402C10.9119 5.02334 11.1213 5.13241 11.4601 5.13241C11.6949 5.13241 11.7725 5.11279 11.9173 5.01701C12.0132 4.95358 12.1376 4.82778 12.1938 4.73746C12.2852 4.59051 12.2974 4.51361 12.3108 4.00345L12.3258 3.43359H16.2238L16.2387 4.00667C16.2528 4.54371 16.261 4.59072 16.3691 4.75402C16.5475 5.02334 16.7569 5.13241 17.0957 5.13241C17.3305 5.13241 17.4082 5.11279 17.5529 5.01701C17.6488 4.95358 17.7733 4.82778 17.8294 4.73746C17.9209 4.59033 17.933 4.51378 17.9466 3.99928L17.9617 3.42525L18.6994 3.44276C19.3263 3.45759 19.472 3.47407 19.6686 3.55238C20.1456 3.74243 20.4826 4.07484 20.6709 4.54096L20.7708 4.78834L20.7978 11.8632H20.7708C20.7708 18.5193 20.7667 18.9068 20.6935 19.1164C20.5248 19.5998 20.1628 19.9783 19.6847 20.1713L19.4372 20.2712Z"
                          fill="#9998A5"
                        />
                      </svg>
                    }
                    placeholder="Doglan sene"
                  />
                  <DatePicker
                    defaultValue={dayjs(startedday)}
                    className="data-pic2-add"
                    onChange={onchangeStartDay}
                    suffixIcon={
                      <svg
                        width="23"
                        height="22"
                        viewBox="0 0 23 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.5723 8.21052C5.36731 8.27323 5.10403 8.5548 5.04483 8.77461C4.94184 9.15695 5.09486 9.55882 5.42053 9.76121C5.66454 9.91286 6.08467 9.90666 6.32468 9.74788C6.59321 9.57021 6.70326 9.35999 6.70326 9.02462C6.70326 8.69354 6.59342 8.47915 6.33694 8.30948C6.15243 8.18738 5.79785 8.14149 5.5723 8.21052Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M9.31505 8.21052C9.11006 8.27323 8.84677 8.5548 8.78758 8.77461C8.68459 9.15695 8.83761 9.55882 9.16327 9.76121C9.40728 9.91286 9.82742 9.90666 10.0674 9.74788C10.336 9.57021 10.446 9.35999 10.446 9.02462C10.446 8.69354 10.3362 8.47915 10.0797 8.30948C9.89517 8.18738 9.5406 8.14149 9.31505 8.21052Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M13.0578 8.21052C12.8528 8.27323 12.5895 8.5548 12.5303 8.77461C12.4273 9.15695 12.5804 9.55882 12.906 9.76121C13.15 9.91286 13.5702 9.90666 13.8102 9.74788C14.0787 9.57021 14.1888 9.35999 14.1888 9.02462C14.1888 8.69354 14.0789 8.47915 13.8224 8.30948C13.6379 8.18738 13.2833 8.14149 13.0578 8.21052Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M16.8005 8.21052C16.5956 8.27323 16.3323 8.5548 16.2731 8.77461C16.1701 9.15695 16.3231 9.55882 16.6488 9.76121C16.8928 9.91286 17.3129 9.90666 17.5529 9.74788C17.8215 9.57021 17.9315 9.35999 17.9315 9.02462C17.9315 8.69354 17.8217 8.47915 17.5652 8.30948C17.3807 8.18738 17.0261 8.14149 16.8005 8.21052Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M5.5723 11.9522C5.36731 12.0149 5.10403 12.2965 5.04483 12.5163C4.94184 12.8986 5.09486 13.3005 5.42053 13.5029C5.66454 13.6545 6.08467 13.6483 6.32468 13.4896C6.59321 13.3119 6.70326 13.1017 6.70326 12.7663C6.70326 12.4352 6.59342 12.2208 6.33694 12.0512C6.15243 11.9291 5.79785 11.8832 5.5723 11.9522Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M9.31505 11.9522C9.11006 12.0149 8.84677 12.2965 8.78758 12.5163C8.68459 12.8986 8.83761 13.3005 9.16327 13.5029C9.40728 13.6545 9.82742 13.6483 10.0674 13.4896C10.336 13.3119 10.446 13.1017 10.446 12.7663C10.446 12.4352 10.3362 12.2208 10.0797 12.0512C9.89517 11.9291 9.5406 11.8832 9.31505 11.9522Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M5.5723 15.6939C5.36731 15.7566 5.10403 16.0382 5.04483 16.258C4.94184 16.6403 5.09486 17.0422 5.42053 17.2446C5.66454 17.3962 6.08467 17.39 6.32468 17.2312C6.59321 17.0536 6.70326 16.8434 6.70326 16.508C6.70326 16.1769 6.59342 15.9625 6.33694 15.7928C6.15243 15.6707 5.79785 15.6249 5.5723 15.6939Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M9.31505 15.6939C9.11006 15.7566 8.84677 16.0382 8.78758 16.258C8.68459 16.6403 8.83761 17.0422 9.16327 17.2446C9.40728 17.3962 9.82742 17.39 10.0674 17.2312C10.336 17.0536 10.446 16.8434 10.446 16.508C10.446 16.1769 10.3362 15.9625 10.0797 15.7928C9.89517 15.6707 9.5406 15.6249 9.31505 15.6939Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M13.0676 11.9522C12.8626 12.0149 12.5993 12.2965 12.5401 12.5163C12.4372 12.8986 12.5902 13.3005 12.9158 13.5029C13.1599 13.6546 13.58 13.6484 13.82 13.4896C14.0885 13.3119 14.1986 13.1017 14.1986 12.7663C14.1986 12.4352 14.0887 12.2208 13.8323 12.0512C13.6477 11.9291 13.2932 11.8832 13.0676 11.9522Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M16.8104 11.9522C16.6054 12.0149 16.3421 12.2965 16.2829 12.5163C16.1799 12.8986 16.3329 13.3005 16.6586 13.5029C16.9026 13.6546 17.3227 13.6484 17.5627 13.4896C17.8313 13.3119 17.9413 13.1017 17.9413 12.7663C17.9413 12.4352 17.8315 12.2208 17.575 12.0512C17.3905 11.9291 17.0359 11.8832 16.8104 11.9522Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M12.5401 16.258C12.5993 16.0382 12.8626 15.7566 13.0676 15.6939C13.2932 15.6249 13.6477 15.6708 13.8323 15.7929C14.0887 15.9625 14.1986 16.1769 14.1986 16.508C14.1986 16.8434 14.0885 17.0536 13.82 17.2313C13.58 17.39 13.1599 17.3962 12.9158 17.2446C12.5902 17.0422 12.4372 16.6403 12.5401 16.258Z"
                          fill="#9998A5"
                        />
                        <path
                          d="M16.8104 15.6939C16.6054 15.7566 16.3421 16.0382 16.2829 16.258C16.1799 16.6403 16.3329 17.0422 16.6586 17.2446C16.9026 17.3962 17.3227 17.39 17.5627 17.2313C17.8313 17.0536 17.9413 16.8434 17.9413 16.508C17.9413 16.1769 17.8315 15.9625 17.575 15.7929C17.3905 15.6708 17.0359 15.6249 16.8104 15.6939Z"
                          fill="#9998A5"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.5723 0.0390281C5.37897 0.0981639 5.10532 0.382403 5.05004 0.581529C5.02496 0.67176 5.00435 0.961289 5.00422 1.22488L5.00396 1.70416L4.17582 1.7236C3.43416 1.74102 3.30725 1.75517 2.96051 1.85899C1.85747 2.18925 0.974786 3.07014 0.628474 4.18623L0.508362 4.5733V19.153L0.628474 19.54C0.974054 20.6539 1.84633 21.5259 2.96051 21.8714L3.34769 21.9915L19.6523 21.9915L20.0395 21.8714C21.1537 21.5259 22.0259 20.6539 22.3715 19.5401L22.4916 19.153L22.4916 4.5733L22.3715 4.18623C22.0252 3.07022 21.1428 2.18951 20.0395 1.85891C19.6907 1.75435 19.5684 1.74093 18.8068 1.72365L17.9612 1.70446L17.9464 1.13577C17.9324 0.603463 17.9241 0.555983 17.8161 0.392854C17.6383 0.124442 17.428 0.0144707 17.0926 0.0144707C16.7572 0.0144707 16.5469 0.124442 16.3691 0.392854C16.261 0.556155 16.2528 0.603162 16.2387 1.1402L16.2238 1.71328H12.3258L12.3108 1.14343C12.2974 0.633268 12.2852 0.55637 12.1938 0.409412C12.1376 0.319095 12.0132 0.193297 11.9173 0.129861C11.7725 0.0340822 11.6949 0.0144707 11.4601 0.0144707C11.1213 0.0144707 10.9119 0.123539 10.7335 0.392854C10.6254 0.556155 10.6171 0.603162 10.6031 1.1402L10.5881 1.71328H6.7332L6.71823 1.1402C6.7042 0.603162 6.69598 0.556155 6.58783 0.392854C6.52438 0.297032 6.40371 0.176137 6.31973 0.12427C6.14399 0.0156749 5.7831 -0.0254836 5.5723 0.0390281ZM19.4372 20.2712L10.6349 20.3132L3.56279 20.2712L3.31534 20.1713C2.83721 19.9783 2.4752 19.5997 2.30647 19.1164C2.2333 18.9067 2.22917 18.5193 2.22917 11.8631C2.22917 5.20698 2.2333 4.81952 2.30647 4.6099C2.4758 4.12477 2.84126 3.74368 3.31534 3.55789C3.5276 3.47471 3.6647 3.45837 4.27907 3.44301L4.99531 3.42508L5.01041 3.99919C5.02392 4.51378 5.03605 4.59033 5.12756 4.73746C5.1837 4.82778 5.30816 4.95358 5.40405 5.01701C5.54933 5.11314 5.6262 5.13241 5.86436 5.13241C6.10252 5.13241 6.1794 5.11314 6.32468 5.01701C6.42057 4.95358 6.54503 4.82778 6.60117 4.73746C6.69254 4.59051 6.7048 4.51361 6.71823 4.00345L6.7332 3.43359H10.5881L10.6031 4.00667C10.6171 4.54371 10.6254 4.59072 10.7335 4.75402C10.9119 5.02334 11.1213 5.13241 11.4601 5.13241C11.6949 5.13241 11.7725 5.11279 11.9173 5.01701C12.0132 4.95358 12.1376 4.82778 12.1938 4.73746C12.2852 4.59051 12.2974 4.51361 12.3108 4.00345L12.3258 3.43359H16.2238L16.2387 4.00667C16.2528 4.54371 16.261 4.59072 16.3691 4.75402C16.5475 5.02334 16.7569 5.13241 17.0957 5.13241C17.3305 5.13241 17.4082 5.11279 17.5529 5.01701C17.6488 4.95358 17.7733 4.82778 17.8294 4.73746C17.9209 4.59033 17.933 4.51378 17.9466 3.99928L17.9617 3.42525L18.6994 3.44276C19.3263 3.45759 19.472 3.47407 19.6686 3.55238C20.1456 3.74243 20.4826 4.07484 20.6709 4.54096L20.7708 4.78834L20.7978 11.8632H20.7708C20.7708 18.5193 20.7667 18.9068 20.6935 19.1164C20.5248 19.5998 20.1628 19.9783 19.6847 20.1713L19.4372 20.2712Z"
                          fill="#9998A5"
                        />
                      </svg>
                    }
                    placeholder="Ise baslan sene"
                  />
                </div>{" "}
                <div className="ad-text-item">
                  <p className="ad-title">Haysy daşary ýurt dilleri bilýär</p>

                  <input
                    type="text"
                    className="ad-input"
                    {...register("languages", { value: languages })}
                  />
                </div>{" "}
                <div className="ad-text-item">
                  <p className="ad-title">Hökümet sylaglary</p>
                  <input
                    type="text"
                    className="ad-input"
                    {...register("choices", { value: choices })}
                  />
                </div>{" "}
                <div className="ad-text-item">
                  <p className="ad-title">Daşary ýurtda bolmagy</p>
                  <input
                    type="text"
                    className="ad-input"
                    {...register("another_country", { value: country })}
                  />
                </div>{" "}
                <div className="ad-text-item">
                  <p className="ad-title">
                    Türkmenistanyň Mejlisiniň deputatymy:
                  </p>
                  <input
                    type="text"
                    className="ad-input"
                    {...register("deputy", { value: deputy })}
                  />
                </div>
                <div className="ad-text-item">
                  <p className="ad-title">partiya agzasymy</p>
                  <input
                    type="text"
                    className="ad-input"
                    {...register("party_member", { value: party })}
                  />
                </div>
                <div className="ad-text-item">
                  <p className="ad-title">öňki işlän ýerleri</p>
                  <input
                    type="text"
                    className="ad-input"
                    {...register("prev_places", { value: prev })}
                  />
                </div>
                <div className="ad-text-item">
                  <p className="ad-title">Telefon Belgisi</p>
                  <input
                    type="number"
                    className="ad-input"
                    {...register("phone_number", { value: phone })}
                  />
                </div>
              </div>
              <div className="edit-footer">
                <div className="free"></div>
                <button type="submit" className="save-btn">
                  Yatda Saklamak
                </button>
              </div>
            </form>{" "}
          </div>
        ))}
      </Modal>
    </>
  );
};
export default EditModal;
