import React from "react";

import "./style.scss";

function LeftSide({ handleClickCat }) {
  const handleClick = (cat) => {
    handleClickCat(cat);
  };
  return (
    <div className="leftside">
      <div className="item-wrapper">
        <div className="cat">
          <span className="mdi mdi-home icon"></span>
          <span className="text" onClick={() => handleClick("")}>
            All
          </span>
        </div>
        <div className="cat">
          <span className="mdi mdi-language-javascript icon"></span>
          <span className="text" onClick={() => handleClick("javascript")}>
            Javascript
          </span>
        </div>
        <div className="cat">
          <span className="mdi mdi-language-typescript icon"></span>
          <span className="text" onClick={() => handleClick("typescript")}>
            Typescript
          </span>
        </div>
        <div className="cat">
          <span className="mdi mdi-react icon"></span>
          <span className="text" onClick={() => handleClick("reactjs")}>
            ReactJs
          </span>
        </div>
        <div className="cat">
          <span className="mdi mdi-language-html5 icon"></span>
          <span className="text" onClick={() => handleClick("html")}>
            Html
          </span>
        </div>
        <div className="cat">
          <span className="mdi mdi-nodejs icon"></span>
          <span className="text" onClick={() => handleClick("nodejs")}>
            Nodejs
          </span>
        </div>
        <div className="cat">
          <span className="mdi mdi-sass icon"></span>
          <span className="text" onClick={() => handleClick("scss")}>
            Scss
          </span>
        </div>
        <div className="cat">
          <span className="mdi mdi-database icon"></span>
          <span className="text" onClick={() => handleClick("mongodb")}>
            MongoDB
          </span>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
