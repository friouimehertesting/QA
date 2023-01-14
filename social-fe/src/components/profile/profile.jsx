/* eslint-disable no-use-before-define */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";

import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";
import Card from "../card";
import Friends from "../friends";
import Spinner from "../spninner/spinner";
import SuggestionPeople from "../suggestion-people";
import UpdateInfoUser from "../update-info-user";
import DEFAULT from "../../images/default.jpeg";
import LOADING from "../../images/loading-gif.gif";

import "./style.scss";
import { useEffect } from "react";
import axios from "axios";

function Profile() {
  const [show, setShow] = useState(false);
  const [upload, setUpload] = useState(false);
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (post) => {
      return makeRequest.post("/api/v1/upload/profile", post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["user"]);
      setShow(false);
    },
  });

  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest
      .get("/api/v1/posts/" + id + "/user")
      .then((res) => res?.data?.data)
  );

  const {
    isLoading: load,
    error: err,
    data: userInfo,
  } = useQuery(["user"], () =>
    makeRequest.get("/api/v1/users/" + id).then((res) => res?.data?.data)
  );

  useEffect(() => {
    const uploadFile = async () => {
      setUpload(true);
      try {
        if (file) {
          const upload_image = new FormData();
          upload_image.append("file", file);
          upload_image.append("upload_preset", "test_upload_image");
          upload_image.append("cloud_name", "dqpt2ikxe");
          await axios
            .post(
              "https://api.cloudinary.com/v1_1/dqpt2ikxe/image/upload",
              upload_image
            )
            .then((data) => {
              if (data?.data?.url) {
                mutation.mutate({ picture: data?.data?.url });
                setUpload(false);
                setFile("");
              }
            });
        }
      } catch (error) {
        setUpload(false);
      }
    };
    uploadFile();
  }, [file, mutation]);

  if (error || err) {
    return "Error: " + error;
  }

  if (isLoading || load) {
    return <Spinner />;
  }

  return (
    <>
      <div className="profile">
        <div className="profile-background"></div>
        <div className="profile-container">
          <div className="profile-left">
            <div className="profile-left-picture">
              <img
                src={
                  userInfo?.picture?.includes("default")
                    ? DEFAULT
                    : userInfo?.picture || (upload && LOADING)
                }
                alt=""
              />
              {user?.data?._id === id && (
                <div className="hover-upload-picuture">
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <label htmlFor="file">
                    <span className="mdi mdi-camera"></span>
                  </label>
                </div>
              )}
            </div>
            <div className="user-action">
              {user?.data?._id !== id && (
                <>
                  <button className="follow">Follow</button>
                </>
              )}
              {user?.data?._id === id && (
                <button className="setting" onClick={() => setShow(true)}>
                  Settings
                </button>
              )}
              <button className="follow">
                <Link to={"/post"}>Create Post</Link>
              </button>
            </div>
            <div className="people-follow-unfollow">
              <div className="item">
                <div className="text">Followers</div>
                <div className="number">{userInfo?.followers?.length}</div>
              </div>
              <div className="item">
                <div className="text">Following</div>
                <div className="number">{userInfo?.following?.length}</div>
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
          </div>
          <div className="profile-center">
            {isLoading ? (
              <Spinner />
            ) : (
              data?.map((post) => {
                return <Card post={post} key={post?._id} />;
              })
            )}
          </div>
          <div className="profile-right">
            <Friends />
            <SuggestionPeople />
          </div>
        </div>
      </div>
      {show && <UpdateInfoUser setShow={setShow} userInfo={userInfo} />}
    </>
  );
}

export default Profile;
