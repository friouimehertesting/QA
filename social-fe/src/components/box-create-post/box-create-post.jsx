import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import ModalCreateModal from "../modal-create-post";

import "./style.scss";

export default function BoxCreatePost() {
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <div className="box-create-post">
      <button className="createPost" onClick={() => setShow(true)}>
        {user?.data?._id ? (
          "Create Post"
        ) : (
          <Link to={"/login"} className="login-form">
            Please Sign in to create Post
          </Link>
        )}
      </button>
      {show && user?.data?._id && <ModalCreateModal setShow={setShow} />}
    </div>
  );
}
