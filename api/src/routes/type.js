const { Router } = require('express');
const {getAllType} = require('../controllers/type');

const router = Router();

router.get('/', getAllType);

module.exports = router;