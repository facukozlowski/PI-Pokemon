import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon } from "../../redux/actions/actions";
import Back from "../Back/back";
import "./form.style.css";

//----Function Validate----//

export const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[ a-zA-Z0-9_-]{3,10}$/.test(input.name)) {
    errors.name = "Name is invalid";
  }
  if (!input.img) {
    errors.img = "Image is required";
  } else if (!/^(https?:\/\/)?[\w.-]+\.\w{2,}(\/.*)?$/.test(input.img)) {
    errors.img = "Image is invalid";
  }
  if (!input.life) {
    errors.life = "Life is required";
  } else if (!/^(100|[1-9]?[0-9])$/.test(input.life)) {
    errors.life = "Life is invalid";
  }
  if (!input.attack) {
    errors.attack = "Attack is required";
  } else if (!/^(100|[1-9]?[0-9])$/.test(input.attack)) {
    errors.attack = "Attack is invalid";
  }
  if (!input.defense) {
    errors.defense = "Defense is required";
  } else if (!/^(100|[1-9]?[0-9])$/.test(input.defense)) {
    errors.defense = "Defense is invalid";
  }
  if (!input.speed) {
    errors.speed = "Speed is required";
  } else if (!/^(100|[1-9]?[0-9])$/.test(input.speed)) {
    errors.speed = "Speed is invalid";
  }
  if (!input.height) {
    errors.height = "Height is required";
  } else if (!/^(100|[1-9]?[0-9])$/.test(input.height)) {
    errors.height = "Height is invalid";
  }
  if (!input.weight) {
    errors.weight = "Weight is required";
  } else if (!/^(100|[1-9]?[0-9])$/.test(input.weight)) {
    errors.weight = "Weight is invalid";
  }
  return errors;
};

//-------------FORM-------------//
const Form = () => {
  const { pokemon_types } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [listTypes, setListTypes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [input, setInput] = useState({
    name: "",
    img: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  const handlerInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handlerSelect = (selectedType) => {
    const typeId = parseInt(selectedType, 10);
    const type = pokemon_types.find((item) => item.id === typeId);
    
    if (type) {
      if (listTypes.some((existingType) => existingType.id === type.id)){
        setListTypes((prevListTypes) =>
        prevListTypes.filter((existingType) => existingType.id !== type.id)
        );
      } else{
        setListTypes((prevListTypes) => [...prevListTypes, type]);
      }
    }
  };

  const createPokemon = async (event) => {
    event.preventDefault();

    const newPokemon = {
      ...input,
      types: listTypes.map((type) => type.id),
    };

    try {
      await dispatch(postPokemon(newPokemon));

      setSuccessMessage("Pokemon created successfully!");
      setShowSuccessMessage(true);

      setInput({
        name: "",
        img: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
      });
      setListTypes([]);
    } catch (error) {
      console.log("Error creating Pokemon");
    }
  };

  //-------ADD ANOTHER-------//
  const handlerAddOther = (event) => {
    event.preventDefault();
    setInput({
      name: "",
      img: "",
      life: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
    });
    setListTypes([]);
  };

  return (
    <>
      <Back className="link-back" />
      <div className="container-form">
        <div className="wrapper">
          <div className="contacts">
            <h2>Create your Pokemon</h2>
          </div>

          <div className="login-box">
            <form onSubmit={createPokemon}>
              <div className="user-box">
                <label className="label-form">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  className="form-control-material"
                  required
                  value={input.name}
                  onChange={handlerInputChange}
                />
                {errors.name && <p className="danger">{errors.name}</p>}
              </div>
              <div className="user-box">
                <label className="label-form">Image</label>
                <input
                  id="img"
                  name="img"
                  type="text"
                  autoComplete="off"
                  className="form-control-material"
                  required
                  value={input.img}
                  onChange={handlerInputChange}
                />
                {errors.img && <p className="danger">{errors.img}</p>}
              </div>
              <div className="user-box">
                <label className="label-form">Life</label>
                <input
                  id="life"
                  name="life"
                  type="text"
                  autoComplete="off"
                  className="form-control-material"
                  value={input.life}
                  onChange={handlerInputChange}
                />
                {errors.life && <p className="danger">{errors.life}</p>}
              </div>
              <div className="user-box">
                <label className="label-form">Attack</label>
                <input
                  id="attack"
                  name="attack"
                  type="text"
                  autoComplete="off"
                  className="form-control-material"
                  value={input.attack}
                  onChange={handlerInputChange}
                />
                {errors.attack && <p className="danger">{errors.attack}</p>}
              </div>
              <div className="user-box">
                <label className="label-form">Defense</label>
                <input
                  id="defense"
                  name="defense"
                  type="text"
                  autoComplete="off"
                  className="form-control-material"
                  value={input.defense}
                  onChange={handlerInputChange}
                />
                {errors.defense && <p className="danger">{errors.defense}</p>}
              </div>
              <div className="user-box">
                <label className="label-form">Speed</label>
                <input
                  id="speed"
                  name="speed"
                  type="text"
                  autoComplete="off"
                  className="form-control-material"
                  value={input.speed}
                  onChange={handlerInputChange}
                />
                {errors.speed && <p className="danger">{errors.speed}</p>}
              </div>
              <div className="user-box">
                <label className="label-form">Height</label>
                <input
                  id="height"
                  name="height"
                  type="text"
                  autoComplete="off"
                  className="form-control-material"
                  value={input.height}
                  onChange={handlerInputChange}
                />
                {errors.height && <p className="danger">{errors.height}</p>}
              </div>
              <div className="user-box">
                <label className="label-form">Weight</label>
                <input
                  id="weight"
                  name="weight"
                  type="text"
                  autoComplete="off"
                  className="form-control-material"
                  value={input.weight}
                  onChange={handlerInputChange}
                />
                {errors.weight && <p className="danger">{errors.weight}</p>}
              </div>
              <div className="user-box">
                <label className="select-label-form-types">Types</label>
                <select
                  name="types"
                  className="select-form-types"
                  multiple
                  onChange={(event) => handlerSelect(event.target.value)}
                >
                  {pokemon_types?.map((item) => {
                    const isSelected = listTypes.some(
                      (type) => type.id === item.id
                    );
                    const typeClassName = isSelected ? "selected" : "no-selected";
                    return (
                      <option key={item.id} value={item.id} className={typeClassName}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="btn-container">
                <button
                  type="submit"
                  className="full-width"
                  onClick={handlerAddOther}
                >
                  Add other
                </button>
                <button type="submit" className="full-width">
                  Create
                </button>
              </div>
            </form>
            {showSuccessMessage && (
              <div
                className="overlay"
                onClick={() => setShowSuccessMessage(false)}
              >
                {" "}
                <div className="success-message">{successMessage}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
