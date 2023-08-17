import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemon } from "../../redux/actions/actions";
import "./searchBar.style.css";
import { VscSearch } from "react-icons/vsc";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const submitPokemon = (event) => {
    event.preventDefault();
    // validacion para que no se permita realizar una busqueda "vacia"
    if (name.trim() !== "") dispatch(getPokemon(name));
  };

  return (
    <form onSubmit={submitPokemon} className="form">
      <input
        id="name"
        name="name"
        type="text"
        autoComplete="off"
        placeholder="Pokemons"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">
        <VscSearch className="icon-search" />
      </button>
    </form>
  );
};

export default SearchBar;
