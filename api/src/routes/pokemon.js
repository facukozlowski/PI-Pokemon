const {Router} = require("express");
const {getAllPokemons, getPokemonId, postPokemon} = require('../controllers/pokemon')

const router = Router();

router.get("/:id", getPokemonId);
router.get("/", getAllPokemons);
router.post("/", postPokemon);

module.exports = router;