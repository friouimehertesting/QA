import React from "react";

function SuggestionPeopleItem({ user, currentUser }) {
  return (
    !user?.followers?.includes(currentUser?.data?._id) && (
      <div className="suggestion-people-body-item">
        <div className="item">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            alt=""
            className="user-picture"
          />
          <div className="info">
            <div className="username">{user?.pseudo}</div>
            <div className="position">{user?.desc}</div>
          </div>
        </div>
        <div className="item">
          <button className="suggestion-people-btn">
            <span className="mdi mdi-plus"></span>
          </button>
        </div>
      </div>
    )
  );
}

export default SuggestionPeopleItem;
