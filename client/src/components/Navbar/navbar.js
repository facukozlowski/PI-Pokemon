import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to={{ pathname: "/home" }} target="_blank"></Link>
    </div>
  );
};

export default Navbar;
