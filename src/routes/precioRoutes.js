const express = require('express');
const router = express.Router();
const controller = require('../controllers/precioController');
const upload = require('../middlewares/upload');
const { verificarToken } = require('../middlewares/authMiddleware');

console.log('rutas de precios UPLOAD...');
router.post('/upload', upload.single('archivo'), controller.subirArchivo);

module.exports = router;
