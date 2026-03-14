const express = require('express');
const router = express.Router();
const controller = require('../controllers/emisorController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', controller.getAll);
router.post('/', verificarToken, controller.create);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
