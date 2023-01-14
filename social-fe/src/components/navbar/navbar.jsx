import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import DEFAULT from "../../images/default.jpeg";
import UserSettings from "../user-settings";

import "./style.scss";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [view, setView] = useState(false);

  const handleClickAvatar = () => {
    setView((t) => !t);
  };

  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="navbar-left">
            <span className="mdi mdi-diamond"></span>
            <Link to={"/"} className="title">
              QA
            </Link>
            <sup>mern</sup>
          </div>
          <div className="navbar-center">
            <div className="search">
              <span className="mdi mdi-search-web icon"></span>
              <input type="text" placeholder="Search ..." />
            </div>
          </div>
          <div className="navbar-right">
            {user ? (
              <div className="item">
                <div className="username">
                  <img
                    src={
                      user?.data?.picture?.includes("default")
                        ? DEFAULT
                        : user?.data?.picture
                    }
                    alt=""
                    className="img-user-name"
                    onClick={handleClickAvatar}
                  />
                </div>
                {view && <UserSettings setView={setView} />}

                <button className="add-post">
                  <span className="mdi mdi-plus-box"></span>
                  <Link to={"/post"}>Write Post</Link>
                </button>
              </div>
            ) : (
              <div className="item">
                <button className="auth-login">
                  <span className="mdi mdi-login icon-login"></span>
                  <Link to={"/login"}>Login</Link>
                </button>
                <button className="auth-register">
                  <span className="mdi mdi-account-plus icon-register"></span>
                  <Link to={"/register"}>Register</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
