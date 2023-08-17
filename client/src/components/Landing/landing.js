import React from "react";
import { Link } from "react-router-dom";
import "./landing.style.css";

const Landing = () => {
  return (
    <div className="landing">
      <h1>Welcome Pokemon Page!</h1>
      <Link to="/home">Ingresar</Link>
    </div>
  );
};

export default Landing;
