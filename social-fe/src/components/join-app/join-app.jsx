import React from "react";

import "./style.scss";

function JoinApp() {
  return (
    <div className="join-app">
      <div className="top">
        <h1>Join QA(Question/Anwser) MERN</h1>
      </div>
      <div className="body">Share your knowledge .</div>
      <div className="technologie">
        <div className="item">
          <span className="mdi mdi-language-javascript icon"></span>
          <span className="text">Javascript</span>
        </div>
        <div className="item">
          <span className="mdi mdi-language-html5 icon"></span>
          <span className="text">Html</span>
        </div>
        <div className="item">
          <span className="mdi mdi-react icon"></span>
          <span className="text">Reactjs</span>
        </div>
        <div className="item">
          <span className="mdi mdi-nodejs icon"></span>
          <span className="text">Nodejs</span>
        </div>
        <div className="item">
          <span className="mdi mdi-language-html5 icon"></span>
          <span className="text">Typescript</span>
        </div>
        <div className="item">
          <span className="mdi mdi-database icon"></span>
          <span className="text">Mongodb</span>
        </div>
        <div className="item">
          <span className="mdi mdi-sass icon"></span>
          <span className="text">Sass</span>
        </div>
      </div>
    </div>
  );
}

export default JoinApp;
