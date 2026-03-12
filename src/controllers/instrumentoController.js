const service = require("../services/instrumentoService");

const instrumentoController = {
  getAll: async (req, res) => {
    try {
      const instrumentos = await service.getAll();
      res.json(instrumentos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const instrumento = await service.getById(req.params.id);
      if (!instrumento)
        return res.status(404).json({ error: "Instrumento no encontrado" });
      res.json(instrumento);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevo = await service.create(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const actualizado = await service.update(req.params.id, req.body);
      if (!actualizado)
        return res.status(404).json({ error: "Instrumento no encontrado" });
      res.json(actualizado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const eliminado = await service.delete(req.params.id);
      if (!eliminado)
        return res.status(404).json({ error: "Instrumento no encontrado" });
      res.json({ message: "Instrumento eliminado", instrumento: eliminado });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = instrumentoController;
