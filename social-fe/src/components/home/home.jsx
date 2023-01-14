import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useState } from "react";

import makeRequest from "../../axios/axios";
import BoxCreatePost from "../box-create-post";
import JoinApp from "../join-app";
import LeftSide from "../left-side";
import Posts from "../posts";
import RightSide from "../right-side";
import Spinner from "../spninner/spinner";
import { AuthContext } from "../../context/auth-context";

import "./style.scss";

function Home() {
  const [cat, setCat] = useState("");
  let api = "/api/v1/posts";

  if (cat) {
    api = api + "?cat=" + cat;
  }

  const { user } = useContext(AuthContext);

  const { isLoading, error, data, refetch } = useQuery(["posts"], () =>
    makeRequest.get(api).then((res) => res?.data?.data)
  );

  useEffect(() => {
    if (cat) {
      refetch();
    }
  }, [cat, refetch]);

  if (error) {
    return "Error: " + error;
  }

  const handleClickCat = (category) => {
    setCat(category);
  };

  return (
    <>
      <div className="home">
        <div className="container">
          <LeftSide handleClickCat={handleClickCat} />
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="wrapper-home">
              <BoxCreatePost />
              <Posts posts={data} refetch={refetch} />
            </div>
          )}
          {user?.data?._id ? (
            <RightSide />
          ) : (
            <div className="join-app-wrapper">
              <JoinApp />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
