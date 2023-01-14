import React from "react";
import { Link } from "react-router-dom";

import DEFAULT from "../../images/default.jpeg";

import "./style.scss";

function ModalDetailUser({ userInfo, isShown, setIsShown }) {
  return (
    <div className="modal-detail-user">
      <div className="user">
        <div className="picture">
          {userInfo?.picture && (
            <img
              alt=""
              src={
                (userInfo?.picture?.includes("default") && DEFAULT) ||
                userInfo?.picture
              }
            />
          )}
        </div>
        <div className="detail">
          <div className="name">
            <Link to={"/profile/" + userInfo?._id}>{userInfo?.pseudo}</Link>
          </div>
          <div className="desc">{userInfo?.desc}</div>
        </div>
      </div>
      <div className="user-details">
        <div className="item">
          <span className="mdi mdi-account"></span>
          <span className="text">{userInfo?.pseudo}</span>
        </div>
        <div className="item">
          <span className="mdi mdi-phone"></span>
          <span className="text">{userInfo?.phone}</span>
        </div>
        <div className="item">
          <span className="mdi mdi-email"></span>
          <span className="text">{userInfo?.email}</span>
        </div>
        <div className="item">
          <span className="mdi mdi-information-outline"></span>
          <span className="text"> {userInfo?.position}</span>
        </div>
        <div className="item">
          <span className="mdi mdi-map-marker-radius"></span>
          <span className="text">{userInfo?.location}</span>
        </div>
        <div className="item">
          <span className="mdi mdi-web"></span>
          <span className="text">{userInfo?.language}</span>
        </div>

        <div className="item">
          <span className="mdi mdi-seal"></span>
          <span className="text">{userInfo?.desc}</span>
        </div>
      </div>
      <div className="modal-footer">
        <div className="item">
          <span className="mdi mdi-account-plus"></span>
          <span className="text">Follow</span>
        </div>
        <div className="item">
          <span className="mdi mdi-plus-outline"></span>
          <span className="text">Create Post</span>
        </div>
      </div>
    </div>
  );
}

export default ModalDetailUser;
