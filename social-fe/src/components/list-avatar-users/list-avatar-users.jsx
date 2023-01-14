import React from "react";
import { Link } from "react-router-dom";

import DEFAULT from "../../images/default.jpeg";

import "./style.scss";

function Avatars({ total, likers }) {
  return (
    <div className="avatars-group">
      {likers?.map((liker) => {
        return (
          <div className="avatar" key={liker?._id}>
            <Link to={"/profile/" + liker?._id} className="name">
              {liker?.pseudo}
            </Link>
            <img
              src={
                liker?.picture?.includes("default") ? DEFAULT : liker?.picture
              }
              alt=""
            />
          </div>
        );
      })}
      <div className="avatar">
        <div className="total">{total}</div>
      </div>
    </div>
  );
}

export default Avatars;
