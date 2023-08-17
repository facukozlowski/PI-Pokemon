import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonId } from "../../redux/actions/actions";
import Back from "../Back/back";
import "./detail.style.css";

const Detail = (props) => {
  const { pokemon_by_id } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = props.match.params.id;
    dispatch(getPokemonId(id));
  }, [props.match.params.id]);

  return (
    <>
    
      <Back className="link-back" />
      <div className="details-pokemon">
        <div className="details-left">
          <img className="img" src={pokemon_by_id.img} />
        </div>
        <div className="details-rigth">
          <div className="details-header">
            <span className="details-id"># {String(pokemon_by_id.id).substring(0, 4)} </span>
            <span className="details-name">{pokemon_by_id.name}</span>
          </div>
          <div className="details-body">
            <span>Life: {pokemon_by_id.life}</span>
            <span>Life: {pokemon_by_id.life}</span>
            <span>Attack: {pokemon_by_id.attack}</span>
            <span>Defense: {pokemon_by_id.defense}</span>
            <span>Speed: {pokemon_by_id.speed}</span>
            <span>Height: {pokemon_by_id.height}</span>
            <span>Weight: {pokemon_by_id.weight}</span>
            <span className="details-types">
              Type:
              {pokemon_by_id.types?.map((value) => value.name).join(" - ")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
