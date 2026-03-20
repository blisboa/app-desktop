const Operacion = require('../models/operacionModel');
const { success, error } = require('../utils/response');

const operacionController = {
  async buscar(req, res) {
    try {
      const data = await Operacion.buscar(req.query);

      success(res, data, 'Operaciones obtenidas');
    } catch (err) {
      console.error(err);
      error(res, 'Error al consultar operaciones');
    }
  },

  async crearCompra(req, res) {
    try {
      const data = await Operacion.crearCompra(req.body);

      success(res, data, 'Compra creada correctamente');
    } catch (err) {
      console.error(err);
      error(res, 'Error al crear compra');
    }
  },
};

module.exports = operacionController;

/*
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
*/
