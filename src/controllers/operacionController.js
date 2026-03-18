const Operacion = require('../models/operacionModel');

const operacionController = {
  async buscar(req, res) {
    try {
      const data = await Operacion.buscar(req.query);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al consultar operaciones' });
    }
  },

  async crearCompra(req, res) {
    try {
      const data = await Operacion.crearCompra(req.body);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear compra' });
    }
  },
};

module.exports = operacionController;
