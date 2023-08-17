const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typeRoute = require('./type');
const pokemonRoute = require('./pokemon');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', typeRoute);
router.use('/pokemons', pokemonRoute);

module.exports = router;