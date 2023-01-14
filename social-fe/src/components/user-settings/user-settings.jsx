import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";
import useClickOutside from "../../hooks/use-click-outside";

import "./style.scss";

function UserSettings({ setView }) {
  const { dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await makeRequest.get("api/v1/auth/logout");
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (error) {}
  };

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, setView);

  return (
    <div className="user-setting-account" ref={wrapperRef}>
      <div className="item-wrapper">
        <span className="mdi mdi-account"></span>
        <span className="text info-name">{user?.data?.pseudo}</span>
      </div>
      <div className="item-wrapper">
        <span className="mdi mdi-email"></span>
        <span className="text">{user?.data?.email}</span>
      </div>
      <div className="item-wrapper">
        <span className="mdi mdi-account"></span>
        <span className="text">
          <Link to={"/profile/" + user?.data?._id}>My Profile</Link>
        </span>
      </div>
      <div className="item-wrapper logout-action" onClick={handleClick}>
        <span className="mdi mdi-logout"></span>
        <span className="text">logout</span>
      </div>
    </div>
  );
}

export default UserSettings;
