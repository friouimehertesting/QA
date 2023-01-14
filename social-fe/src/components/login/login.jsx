import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";

import AUTH from "../../images/auth.jpeg";

import "./style.scss";

function Login() {
  const { dispatch, user, error } = useContext(AuthContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const registerUser = await makeRequest.post("/api/v1/auth/login", input);
      dispatch({ type: "LOGIN_SUCCESS", payload: registerUser?.data });
      if (registerUser) {
        navigate("/");
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILED",
        payload: error?.response?.data?.message,
      });
    }
  };
  useEffect(() => {
    if (user && user?.data) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h1 className="title">Login</h1>
          <form className="form">
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

            <button className="login-btn" onClick={handleClick}>
              Login
            </button>
            <div className="footer">
              <span className="account">
                Create an account <Link to={"/register"}>register</Link>
              </span>
            </div>
            {error && <span className="error">{error}</span>}
          </form>
        </div>

        <div className="login-right">
          <img src={AUTH} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
