const express = require('express');
const router = express.Router();
const controller = require('../controllers/instrumentoController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', verificarToken, controller.create);
//router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
