import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useRef } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";
import useClickOutside from "../../hooks/use-click-outside";

import "./style.scss";

function ModalCreateModal({ setShow, handleCreate }) {
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (post) => {
      return makeRequest.post("/api/v1/posts", post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setShow(false);
    },
  });
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({});

  const pattern = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
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
    if (input?.video) {
      console.log("ok", input?.video);
      let checkVideo = pattern.test(input?.video);
      console.log("ok", checkVideo);

      if (!checkVideo) {
        setError("You must provide a Valid Video from Youtube.");
        return;
      }
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
  const ref = useRef();
  useClickOutside(ref, setShow);
  return (
    <div className="modal-create-post">
      <div className="modal-create-post-container" ref={ref}>
        <div className="modal-create-post-title">
          <h1 className="title">Create New Post?</h1>
        </div>
        <div className="body">
          <div className="item">
            <span className="text">Title</span>
            <input
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <span className="text">Link Video</span>
            <input
              type="text"
              placeholder="Link video ..."
              name="video"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <span className="text">Description</span>
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              name="desc"
              onChange={setValue}
            />
          </div>
          <div className="item">
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
            />
            <label htmlFor="file" className="file">
              Upload Image
            </label>
          </div>
          <div className="item">
            <span className="text">Category</span>
            <select name="cat" onChange={handleChange}>
              <option value="javascript">javascript</option>
              <option value="reactjs">Reactjs</option>
              <option value="typescript">Typescript</option>
              <option value="nodejs">Nodejs</option>
              <option value="html">Html</option>
              <option value="mongodb">Mongodb</option>
              <option value="sass">Sass</option>
            </select>
          </div>
        </div>
        <div className="action-btn">
          <button className="create" onClick={(e) => handleSubmit(e)}>
            Create
          </button>
          <button className="close" onClick={() => setShow(false)}>
            Cancel
          </button>
        </div>
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}

export default ModalCreateModal;
