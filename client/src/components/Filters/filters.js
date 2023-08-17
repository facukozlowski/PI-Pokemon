import React, { useState, useEffect } from "react";
import FilterType from "../FilterType/filterType";
import FilterOrder from "../FilterOrder/filterOrder";
import "./filters.style.css";

/* FILTER DB API */
export const handlerFilterDbApi = (orderMe, pokemon) => {
  if (orderMe === "default") return pokemon;
  if (Number(orderMe) === 1) {
    /*DB*/
    const list = pokemon?.filter((poke) => isNaN(poke.id));
    return list;
    /*API*/
  } else {
    const list = pokemon?.filter((poke) => !isNaN(poke.id));
    return list;
  }
};

/* ORDENO POR NOMBRE A-Z || Z-A && ATTACK */

export const orderByName = (orderMe, pokemon) => {
  const array = [...pokemon];
  if (orderMe === "default") {
    array.sort((a, b) =>  b.attack - a.attack)
    return array
  }
  
  const arr = [...pokemon];
  if (Number(orderMe) === 1) {
    arr.sort((a, b) => {
      let na = a.name.toLowerCase(),
        nb = b.name.toLowerCase();
      if (na < nb) {
        return -1;
      }
      if (na > nb) {
        return 1;
      }
      return 0;
    });
  } else {
    arr.sort((a, b) => {
      let na = a.name.toLowerCase(),
        nb = b.name.toLowerCase();
      if (na < nb) {
        return 1;
      }
      if (na > nb) {
        return -1;
      }
      return 0;
    });
  }
  return arr;
};

/* FILTER BY TYPE */
export const filterByType = (pokeSelected, pokemon) => {
  if (pokeSelected === "default") {
    return pokemon;
  }
  let filter = [];
  for (let i = 0; i < pokemon.length; i++) {
    const element = pokemon[i];
    for (let x = 0; x < element.types.length; x++) {
      const types = element.types[x];
      if (types.name == pokeSelected) {
        filter.push(pokemon[i]);
      }
    }
  }
  return filter;
};

const Filters = ({ pokemon, setPokemonList, pokemon_types }) => {
  const [pokeSelected, setPokemonSelected] = useState(null);
  useEffect(() => {
    setPokemonList(pokemon);
  }, [pokemon]);

  const filterByDbApi = (orderMe) => {
    const filteredByDbApi = handlerFilterDbApi(orderMe, pokemon);
    setPokemonList(filteredByDbApi);
  };

  const [orderBy, setOrderBy] = useState([]);
  const handlerOrderChange = (orderMe) => {
      const orderedByName = orderByName(orderMe, pokemon);
      setPokemonList(orderedByName);
  };

  const handlerSelectChange = (pokeSelected) => {
    setPokemonSelected(pokeSelected);
    const filteredByType = filterByType(pokeSelected, pokemon);
    setPokemonList(filteredByType);
  };

  return (
    <div className="filter-show">
      <FilterType
        filterByDbApi={filterByDbApi}
        handlerSelectChange={handlerSelectChange}
        pokemon_types={pokemon_types}
      />
      <FilterOrder handlerOrderChange={handlerOrderChange} />
    </div>
  );
};

export default Filters;
