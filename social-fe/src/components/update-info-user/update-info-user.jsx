import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";
import { countryList, JOBS } from "../../data";

import "./style.scss";

function UpdateInfoUser({ setShow, userInfo }) {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState({ ...userInfo });

  const mutation = useMutation({
    mutationFn: (info) => {
      return makeRequest.put(`/api/v1/users/${user?._id}/profile`, info);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      setShow(false);
      setInput({});
    },
  });

  const handleUpdateProfile = () => {
    mutation.mutate(input);
  };
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="update-info-user">
      <div className="update-info-user-modal">
        <div className="modal-header">
          <div className="title">Update Information User</div>
          <div className="action" onClick={() => setShow(false)}>
            <span className="mdi mdi-close"></span>
          </div>
        </div>
        <div className="modal-body">
          <div className="item">
            <span className="mdi mdi-account"></span>
            <input
              type="text"
              placeholder="Username ..."
              onChange={handleChange}
              name="pseudo"
              value={input?.pseudo}
            />
          </div>

          <div className="item">
            <span className="mdi mdi-email"></span>
            <input
              type="email"
              placeholder="Email ..."
              onChange={handleChange}
              name="email"
              value={input.email}
            />
          </div>

          <div className="item">
            <textarea
              type="text"
              placeholder="Description ..."
              rows={5}
              onChange={handleChange}
              name="desc"
              value={input.desc}
            />
          </div>

          <div className="item">
            <span className="mdi mdi-phone"></span>
            <input
              type="number"
              placeholder="Phone ..."
              onChange={handleChange}
              name="phone"
              value={input.phone}
            />
          </div>

          <div className="item">
            <span className="mdi mdi-seal"></span>

            <select
              onChange={handleChange}
              name="position"
              value={input.position}
            >
              {JOBS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="item">
            <span className="mdi mdi-web"></span>
            <select
              onChange={handleChange}
              name="language"
              value={input.language}
            >
              <option value="ar">Arabe</option>
              <option value="fr">Français</option>
              <option value="en">Englais</option>
            </select>
          </div>

          <div className="item">
            <span className="mdi mdi-map-marker"></span>
            <select
              onChange={handleChange}
              name="location"
              value={input.location}
            >
              {countryList.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="update">
            <span className="mdi"></span>
            <span className="text" onClick={handleUpdateProfile}>
              Update
            </span>
          </button>
          <button className="close" onClick={() => setShow(false)}>
            <span className="mdi"></span>
            <span className="text">Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateInfoUser;
