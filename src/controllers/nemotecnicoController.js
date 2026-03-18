const Nemotecnico = require('../models/nemotecnicoModel');

const controller = {
  async validar(req, res) {
    const { id } = req.params;

    const data = await Nemotecnico.buscarPorId(id);

    if (!data) {
      return res.status(404).json({ error: 'No existe' });
    }

    res.json(data);
  },
};

module.exports = controller;
