const express = require('express');
const router = express.Router();
const controller = require('../controllers/nemotecnicoController');

router.get('/:id', controller.validar);

module.exports = router;
