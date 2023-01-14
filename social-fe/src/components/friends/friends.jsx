import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";
import SuggestionFriendItem from "./friend-item";

import "./style.scss";

function Friends() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const params = useParams();
  let api;
  if (params?.id) {
    api = `/api/v1/users/${params?.id}/following`;
  } else {
    api = `/api/v1/users/${user?.data?._id}/following`;
  }
  const { error, data } = useQuery(
    ["following"],

    () => makeRequest.get(api).then((res) => res?.data?.data)
  );

  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.patch(`/api/v1/users/unfollow`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["following"]);
    },
  });

  const handleUnfollow = (id) => {
    const unfollowUser = { idUnFollow: id };
    mutation.mutate(unfollowUser);
  };

  if (error) {
    return "Error: " + error;
  }

  return (
    <div className="friends">
      <div className="friends-top">
        <h1 className="friends-top-dev">Friends</h1>
      </div>
      <div className="friends-body">
        {data?.following?.map((friend) => {
          return (
            <SuggestionFriendItem
              key={friend?._id}
              friend={friend}
              handleUnfollow={handleUnfollow}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Friends;
