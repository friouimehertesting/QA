import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";

import AUTH from "../../images/auth.jpeg";

import "./style.scss";

function Register() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    pseudo: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const { user, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const registerUser = await makeRequest.post(
        "/api/v1/auth/register",
        input
      );
      if (registerUser?.data) {
        navigate("/login");
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILED",
        payload: error?.response?.data?.error,
      });
    }
  };

  useEffect(() => {
    if (user && user?.data) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="register">
      <div className="register-wrapper">
        <div className="register-left">
          <h1 className="title">Register</h1>
          <form className="form">
            <div className="item">
              <span className="mdi mdi-account icon"></span>
              <input
                type="text"
                placeholder="Pseudo ..."
                name="pseudo"
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <span className="mdi mdi-email icon"></span>
              <input
                type="email"
                placeholder="Email ..."
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <span className="mdi mdi-lock icon"></span>
              <input
                type="password"
                placeholder="Password ..."
                name="password"
                onChange={handleChange}
              />
            </div>
            <button className="register-btn" onClick={handleClick}>
              Register
            </button>
            <div className="footer">
              <span className="account">
                Already have an account ? <Link to={"/login"}>Login</Link>
              </span>
            </div>
            {error && <span className="error">{error}</span>}
          </form>
        </div>
        <div className="register-right">
          <img src={AUTH} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Register;
