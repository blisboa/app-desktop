const express = require('express');
const router = express.Router();
const controller = require('../controllers/operacionController');

router.get('/', controller.buscar);
router.post('/compra', controller.crearCompra);

module.exports = router;
