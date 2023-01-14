import React from "react";
import SuggestionPeople from "../suggestion-people";
import Friends from "../friends";

import "./style.scss";

function RightSide() {
  return (
    <div className="rightside">
      <Friends />
      <SuggestionPeople />
    </div>
  );
}

export default RightSide;
