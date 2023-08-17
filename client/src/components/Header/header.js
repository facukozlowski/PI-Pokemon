import React from "react";
import Navbar from "../Navbar/navbar";
import SearchBar from "../SearchBar/searchBar";
import Logo from "../../assets/img/pokemon.png";
import { Link } from "react-router-dom";
import "./header.style.css";
//----------Icons----------
import { VscAdd } from "react-icons/vsc";

const Header = () => {
  return (
    <header className="container">
      <div>
        <Link to="/">
          <img className="img" src={Logo} alt="pokemon icon" />
        </Link>
        <p>Pokemon finder</p>
      </div>
      <SearchBar />
      <div className="header-links">
        <Link to="/create">
          <VscAdd className="icon-add" />
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
