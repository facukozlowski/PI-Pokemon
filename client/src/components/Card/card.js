import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./card.style.css";

const Card = (props) => {
  //Agrego un estado para poder cerrar las cartas que renderizo
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
  };

  if (isClosed) {
    return null;
  }

  return (
    <div className="card">
      <button className="close-btn" onClick={handleClose}>
        X
      </button>
      <img className="card-img" src={props.img} alt="" />
      <div className="card-container">
        <Link className="card-title" to={`/pokemons/${props.id}`}>
          <span>{props.name}</span>
        </Link>
        <span className="card-header">
          {props.types?.map((value) => value.name).join(" - ")}
        </span>
      </div>
    </div>
  );
};

export default Card;
