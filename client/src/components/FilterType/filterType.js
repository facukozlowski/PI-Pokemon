import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes } from "../../redux/actions/actions";
import "./filterType.style.css";

const FilterType = ({ filterByDbApi, handlerSelectChange, pokemon_types }) => {
  const [filterBy, setFilterBy] = useState("");
  const [typePokemon, setTypePokemon] = useState("");

  const handlerType_pokemon = (event) => {
    setTypePokemon({
      [event.target.name]: event.target.value,
    });
  };

  const handlerFilter_by = (event) => {
    setFilterBy({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="filter-type">
      {/*SELECCIONO DONDE ESTA LOCALIZADO SI EN LA BASE DE DATOS O LA API */}
      <div className="filter-type-left">
        <label>Filter: </label>
        <select
          defaultValue={"default"}
          name="filter_by"
          onChange={(event) => filterByDbApi(event.target.value)}
        >
          <option key={0} value="default">
            ALL
          </option>
          <option key={1} value={1}>
            DB
          </option>
          <option key={2} value={2}>
            API
          </option>
        </select>
      </div>

      {/* SELECCIONO EL TIPO DE POKEMON */}
      <div>
        <label>by pokemon: </label>
        <select
          defaultValue={"default"}
          onChange={(event) => handlerSelectChange(event.target.value)}
        >
          <option key={1234} value={"default"}>
            All Pokemons
          </option>
          {pokemon_types?.map((item, i) => {
            return (
              <option key={i} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default FilterType;