const Fondo = require('../models/fondoModel');

const fondoController = {
  async getAll(req, res) {
    try {
      const data = await Fondo.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener fondos' });
    }
  },
};

module.exports = fondoController;
