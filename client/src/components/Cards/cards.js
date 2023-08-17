import React, { useState } from "react";
import Card from "../Card/card";
import "./cards.style.css";

const Cards = ({ pokemons }) => {
  return (
    <div className="cards-result">
      {pokemons?.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            img={pokemon.img}
            types={pokemon.types}
            showCloseButton={true}
          />
        );
      })}
    </div>
  );
};

export default Cards;
