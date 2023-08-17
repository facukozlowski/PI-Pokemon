import React from "react";
import { Link } from "react-router-dom";
import "./back.style.css";
//----------Icons----------
import { VscArrowLeft } from "react-icons/vsc";

const Back = () => {
  return (
    <div>
      <Link to="/home" className="link-back">
        <VscArrowLeft className="icon-back" />
      </Link>
    </div>
  );
};

export default Back;
