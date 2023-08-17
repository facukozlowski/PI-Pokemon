import React from "react";
import { Link } from "react-router-dom";
import "./footer.style.css";
//----------Icons----------
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
        <p>Desing by Facundo Kozlowski</p>
      <div className="social-icon">
      <a className="link" href="https://github.com/facukozlowski" target="_blank" > 
        <FaGithub />
        </a>
        <a className="link" href="https://www.linkedin.com/in/facundo-kozlowski-257100246/" target="_blank" >
        <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
