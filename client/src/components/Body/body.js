import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getAllTypes } from "../../redux/actions/actions";
import Cards from "../Cards/cards";
import Filters from "../Filters/filters";
import Arrow from "../Arrow/arrow";
import "./body.style.css";
//-----------------Icons-----------------//
import { VscFilter } from "react-icons/vsc";

const Body = () => {
  const { pokemon, pokemon_only } = useSelector((state) => state);
  const { pokemon_types } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [pokemonList, setPokemonList] = useState([]);
  const [filters, setFilters] = useState(false);

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  useEffect(() => {
    setPokemonList(pokemon);
  }, [pokemon]);

  //-----------PAGINADO-----------//

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState([]);

  useEffect(() => {
    setTotalPages(Math.ceil(pokemonList.length / itemsPerPage));
    setPage(pokemonList.slice(0, 12));
  }, [pokemonList]);

  useEffect(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    setPage(pokemonList.slice(firstIndex, lastIndex));
  }, [currentPage]);

  const handlerPageclick = (event) => {
    event.preventDefault();
    if (event.target.name === "next") {
      if (currentPage + 1 > totalPages) return;
      setCurrentPage(currentPage + 1);
    } else {
      if (currentPage - 1 < 1) return;
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <button className="filters-button" onClick={() => setFilters(!filters)}>
        <VscFilter className="icon-filter" />
      </button>
      {/*-- ACTIVE ONLY IF STATE === TRUE --*/}
      {filters && (
        <div className="filters-show">
          <Filters
            pokemon={pokemon}
            setPokemonList={setPokemonList}
            pokemon_types={pokemon_types}
          />
        </div>
      )}

      {/*-- IF POKEMON SEARCH HAS A RESULT --*/}
      <div className={pokemon_only.length ? "body-search" : "body-result"}>
        {pokemon_only.length > 0 && <Cards pokemons={pokemon_only} />}
        {pokemonList.length ? (
          /*--RENDER CARDS AND ARROW IF NOT LOADING  --*/
          <div>
            <Cards pokemons={page} />
            <Arrow
              // totalPages={totalPages}
              // currentPage={currentPage}
              handlerPageclick={handlerPageclick}
            />
          </div>
        ) : (
          <p className="body-search">LOADING</p>
        )}
      </div>
    </>
  );
};

export default Body;
