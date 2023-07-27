import React from "react";
import "./style.css";
import logo from "../svgphoto/tdei.jpg";
function Footer() {
  return (
    <>
      <div className="f-flex">
        <img src={logo} className="f-logo" alt="" />
        <h2 className="text-f-logo">
          TÜRKMEN DÖWLET <br />
          ENERGETIKA INSTITUTY
        </h2>
      </div>
      <div className="about-us">
        <div className="about-flex">
          <div className="create">
            <div className="circle">
              <svg
                width="46"
                height="46"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.41663 15.1666L26 4.33331L46.5833 15.1666V19.5H5.41663V15.1666ZM26 9.22998L37.2883 15.1666H14.7116L26 9.22998ZM10.8333 23.8333H15.1666V39H10.8333V23.8333ZM23.8333 39V23.8333H28.1666V39H23.8333ZM5.41663 43.3333V47.6666H46.5833V43.3333H5.41663ZM36.8333 23.8333H41.1666V39H36.8333V23.8333Z"
                  fill="#03602B"
                />
              </svg>
            </div>
            <h2 className="f-title">Institutyň döredilenine</h2>
            <p className="f-subtitle">25 ýyl</p>
          </div>
          <div className="adress">
            <div className="circle">
              <svg
                width="46"
                height="46"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M26 4.33331C17.615 4.33331 10.8333 11.115 10.8333 19.5C10.8333 30.875 26 47.6666 26 47.6666C26 47.6666 41.1666 30.875 41.1666 19.5C41.1666 11.115 34.385 4.33331 26 4.33331ZM15.1666 19.5C15.1666 13.52 20.02 8.66665 26 8.66665C31.98 8.66665 36.8333 13.52 36.8333 19.5C36.8333 25.74 30.5933 35.0783 26 40.9066C21.4933 35.1216 15.1666 25.675 15.1666 19.5ZM20.5833 19.5C20.5833 16.5084 23.0084 14.0833 26 14.0833C27.9352 14.0833 29.7234 15.1157 30.691 16.7916C31.6585 18.4676 31.6585 20.5324 30.691 22.2083C29.7234 23.8842 27.9352 24.9166 26 24.9166C23.0084 24.9166 20.5833 22.4915 20.5833 19.5Z"
                  fill="#03602B"
                />
              </svg>
            </div>
            <h2 className="f-title">Salgymyz</h2>
            <p className="f-subtitle">Mary şäher ,Oguzhan köçe ,2-nji jaý</p>
          </div>
          <div className="phone-f">
            <div className="circle">
              <svg
                width="46"
                height="46"
                viewBox="0 0 52 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.66667 6.5H16.25C17.4417 6.5 18.4167 7.475 18.4167 8.66667C18.4167 11.375 18.85 13.975 19.6517 16.4017C19.89 17.16 19.7167 18.005 19.11 18.6117L14.3433 23.3783C17.4633 29.51 22.49 34.515 28.6217 37.6567L33.3883 32.89C33.8217 32.4783 34.3633 32.2617 34.9267 32.2617C35.1433 32.2617 35.3817 32.2833 35.5983 32.37C38.025 33.1717 40.6467 33.605 43.3333 33.605C44.525 33.605 45.5 34.58 45.5 35.7717V43.3333C45.5 44.525 44.525 45.5 43.3333 45.5C22.9883 45.5 6.5 29.0117 6.5 8.66667C6.5 7.475 7.475 6.5 8.66667 6.5ZM14.17 10.8333C14.3 12.7617 14.625 14.6467 15.145 16.445L12.545 19.045C11.6567 16.445 11.0933 13.6933 10.8983 10.8333H14.17ZM35.5333 36.8767C37.375 37.3967 39.26 37.7217 41.1667 37.8517V41.08C38.3067 40.885 35.555 40.3217 32.9333 39.455L35.5333 36.8767Z"
                  fill="#03602B"
                />
              </svg>
            </div>
            <h2 className="f-title">Belgimiz</h2>
            <p className="f-subtitle">+993-65-12-12-10</p>
          </div>
          <div className="email">
            <div className="circle">
              <svg
                width="46"
                height="46"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M43.3333 8.66669H8.66665C6.28331 8.66669 4.35498 10.6167 4.35498 13L4.33331 39C4.33331 41.3834 6.28331 43.3334 8.66665 43.3334H43.3333C45.7166 43.3334 47.6666 41.3834 47.6666 39V13C47.6666 10.6167 45.7166 8.66669 43.3333 8.66669ZM8.66665 17.3334L26 28.1667L43.3333 17.3334V39H8.66665V17.3334ZM8.66665 13L26 23.8334L43.3333 13H8.66665Z"
                  fill="#03602B"
                />
              </svg>
            </div>
            <h2 className="f-title">Email</h2>
            <p className="f-subtitle">tdei@mail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
