const service = require('../services/emisorService');
const log = require('../utils/fileLogger');

const emisorController = {
  getAll: async (req, res) => {
    try {
      // aqui quede....
      const emisores = await service.getAll();
      res.json(emisores);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const instrumento = await service.getById(req.params.id);
      if (!instrumento) return res.status(404).json({ error: 'Instrumento no encontrado' });
      res.json(instrumento);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      //console.log("create try");
      const nuevo = await service.create(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      //console.log("create ctahh");
      log(`usuario:${req.usuario.id_usuario} | POST /instrumento | ${err.stack}`);
      // log(`Error creando instrumento ${req.body.id_instrumento}: ${err.stack}`);
      //res.status(400).json({ error: err.message });
      res.status(400).json({ error: 'No fue posible guardar el instrumento' });
    }
  },

  create1: async (req, res) => {
    try {
      const nuevo = await service.create(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      // log(`Error creando instrumento ${req.body.id_instrumento}: ${err.stack}`);

      /*
      log(
        `usuario:${req.usuario.id_usuario} | Error creando instrumento ${req.body.id_instrumento}: ${err.stack}`,
      );
*/
      res.status(400).json({
        error: 'No fue posible grabar el instrumento',
      });
    }
  },

  update: async (req, res) => {
    try {
      const actualizado = await service.update(req.params.id, req.body);
      if (!actualizado) return res.status(404).json({ error: 'Instrumento no encontrado' });
      res.json(actualizado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const eliminado = await service.delete(req.params.id);
      if (!eliminado) return res.status(404).json({ error: 'Emisor no encontrado' });
      res.json({ message: 'Emisor eliminado', instrumento: eliminado });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = emisorController;
