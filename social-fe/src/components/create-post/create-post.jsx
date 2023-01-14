import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useLocation } from "react-router-dom";

import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";

import "react-quill/dist/quill.snow.css";
import "./style.scss";

function Write() {
  const [error, setError] = useState("");
  const state = useLocation().state;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (post) => {
      return state
        ? makeRequest.put("/api/v1/posts/" + post?._id, post)
        : makeRequest.post("/api/v1/posts", post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [value, setValue] = useState(state?.desc || "");
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({
    ...state,
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const uploadFile = async () => {
    try {
      if (file) {
        const upload_image = new FormData();
        upload_image.append("file", file);
        upload_image.append("upload_preset", "test_upload_image");
        upload_image.append("cloud_name", "dqpt2ikxe");
        await makeRequest
          .post(
            "https://api.cloudinary.com/v1_1/dqpt2ikxe/image/upload",
            upload_image
          )

          .then((data) => {
            setUrl(data?.data?.url);
          });
      }
    } catch (error) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input?.title) {
      setError("You must provide a title.");
      return;
    }
    if (!input?.cat) {
      setError("You must provide a Category.");
      return;
    }

    if (!value) {
      setError("You must provide a Description.");
      return;
    }
    try {
      uploadFile();
      const data = {
        posterId: user?.user?.id,
        ...input,
        desc: value,
        date: new Date(),
        img: url,
      };
      mutation.mutate(data);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="write-post">
      <div className="content">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title ..."
          value={input.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="video"
          id="video"
          placeholder="Link Video ..."
          value={input.video}
          onChange={handleChange}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        {error && <span className="error">{error}</span>}
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status :</b>Draft
          </span>
          <span>
            <b>Visibility :</b>Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className="file">
            Upload Image
          </label>
          <div className="buttons">
            <button onClick={handleSubmit}>
              {useLocation()?.search?.includes("edit") ? "Update" : "Publish"}
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="cat"
              value={"javascript"}
              onChange={handleChange}
              checked={input?.cat === "javascript"}
            />
            <label>Javascript</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="cat"
              value={"typescript"}
              onChange={handleChange}
              checked={input?.cat === "typescript"}
            />
            <label>Typescript</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="cat"
              value={"reactjs"}
              onChange={handleChange}
              checked={input?.cat === "reactjs"}
            />
            <label>Reactjs</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="cat"
              value={"nodejs"}
              onChange={handleChange}
              checked={input?.cat === "nodejs"}
            />
            <label>Nodejs</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="cat"
              value={"mongoDB"}
              onChange={handleChange}
              checked={input?.cat === "mongoDB"}
            />
            <label>MongoDB</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="cat"
              value={"html"}
              onChange={handleChange}
              checked={input?.cat === "html"}
            />
            <label>Html</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="cat"
              value={"scss"}
              onChange={handleChange}
              checked={input?.cat === "scss"}
            />
            <label>Scss</label>
          </div>
        </div>
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default Write;
