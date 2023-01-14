import React from "react";

import DEFAULT from "../../images/default.jpeg";

import "./style.scss";

function SuggestionFriendItem({ friend, handleUnfollow }) {
  const handleClickUnfollow = (id) => {
    handleUnfollow && handleUnfollow(id);
  };
  return (
    <div className="suggestion-people-body-item">
      <div className="item">
        <img
          src={
            (friend?.picture?.includes("default") && DEFAULT) || friend?.picture
          }
          alt=""
          className="user-picture"
        />
        <div className="info">
          <div className="username">{friend?.pseudo}</div>
          <div className="position">{friend?.desc}</div>
        </div>
      </div>
      <div className="item">
        <button
          onClick={() => handleClickUnfollow(friend?._id)}
          className="button-friend"
        >
          <span className="mdi mdi-minus"></span>
        </button>
      </div>
    </div>
  );
}

export default SuggestionFriendItem;
