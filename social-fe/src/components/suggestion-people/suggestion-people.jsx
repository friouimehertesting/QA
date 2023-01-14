import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";

import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";
import SuggestionPeopleItem from "./suggestion-people-item";

import "./style.scss";

function SuggestionPeople() {
  const { user: currentUser } = useContext(AuthContext);

  let api;
  api = `/api/v1/users`;

  const { isLoading, error, data } = useQuery(["suggestions"], () =>
    makeRequest.get(api).then((res) => res?.data?.data)
  );

  if (error) {
    return error;
  }

  if (isLoading) {
  }
  return (
    <div className="suggestion-people">
      <div className="suggestion-people-top">
        <h1 className="suggestion-people-top-dev">Suggestion Developper</h1>
      </div>
      <div className="suggestion-people-body">
        {data?.map((user) => (
          <SuggestionPeopleItem
            key={user?._id}
            user={user}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}

export default SuggestionPeople;
