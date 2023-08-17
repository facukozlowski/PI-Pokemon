const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { POKEMON_URL } = require("../constants");
const { Sequelize } = require("sequelize");
var validator = require("validator");

var count = 0;
var offsetDb = 0;

const getAllPokemons = async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    try {
      const { data } = await axios.get(`${POKEMON_URL}/${name}`);
      const values = {
        id: data.id,
        name: data.name,
        types: data.types.map((value) => {
          return { name: value.type.name };
        }),
        img: data.sprites.other["official-artwork"].front_default,
      };
      const dbData = await Pokemon.findAll({ where: { name: name } });
      const response = dbData.concat(values);
      return res.json(response);
    } catch (error) {
      const dbData = await Pokemon.findAll({ where: { name: name }, 
      include: [
        {
          model: Type,
          attributes: ["name"],
        },
      ],
    });
      return dbData
        ? res.json(dbData)
        : res.status(404).json({ message: "the pokemon has not been found." });
    }
  } else {
    // Si query name está vacío entonces busca todos los resultados.
    try {
      //-----------BD CONSULTA------------------
      const dbData = await Pokemon.findAll({
        attributes: ["id", "name", "attack", "img"],
        limit: 48,
        offset: 0,
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      //offsetDb += dbData.length;
      //----------------------------------------
      const url = await axios.get(`${POKEMON_URL}/?offset=${count}&limit=48`);
      //count += 40;
      const filterURL = await url.data.results.map((value) =>
        axios.get(`${value.url}`)
      );

      const allData = await Promise.all(filterURL).then((results) => {
        const resp = results.map((value) => ({
          id: value.data.id,
          name: value.data.name,
          attack: value.data.stats[1].base_stat,
          types: value.data.types.map((value) => {
            return { name: value.type.name };
          }),
          img: value.data.sprites.other["official-artwork"].front_default,
        }));
        return resp;
      });
      //----------------------------------------
      // const results = await User.findAll();
      //const records = dbData.map(result => result.dataValues.types.dataValues);

      console.log(filterURL.data);
      const response = dbData.concat(allData);
      //----------------------------------------
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
};

const getPokemonId = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (validator.isUUID(id)) {
      const dbData = await Pokemon.findByPk(id, {
        attributes: [
          "id",
          "name",
          "life",
          "attack",
          "defense",
          "speed",
          "height",
          "weight",
          "img"
        ],
        include: {
          model: Type,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      });
      return dbData
        ? res.json(dbData)
        : res.status(404).json({ message: "the pokemon has not been found." });
    } else {
      const { data } = await axios.get(`${POKEMON_URL}/${id}`);
      const values = {
        id: data.id,
        name: data.name,
        life: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        types: data.types.map((v) => {
          return { name: v.type.name };
        }),
        img: data.sprites.other["official-artwork"].front_default,
      };
      return res.json(values);
    }
  } catch (err) {
    return res.status(404).json({ message: "the pokemon has not been found." });
  }
};

const postPokemon = async (req, res, next) => {
  try {
    const { name, life, attack, defense, speed, height, weight, img, types } =
      req.body;
    const pokemon = await Pokemon.create({
      name,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
    });

    const foundTypes = await Type.findAll({ where: { id: types } });
    console.log(foundTypes);
    await pokemon.addType(foundTypes);

    return res.status(201).json(pokemon);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPokemons,
  getPokemonId,
  postPokemon,
};
