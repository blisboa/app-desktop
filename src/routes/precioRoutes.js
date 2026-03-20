const express = require('express');
const router = express.Router();
const controller = require('../controllers/precioController');
const upload = require('../middlewares/upload');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/upload', upload.single('archivo'), controller.subirArchivo);

module.exports = router;
