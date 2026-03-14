const Emisor = require('../models/emisorModel');

const emisorService = {
  getAll: () => Emisor.getAll(),
  getById: (id) => Emisor.getById(id),
  create: (data) => Emisor.create(data),
  update: (id, data) => Emisor.update(id, data),
  delete: (id) => Emisor.delete(id),
};

module.exports = emisorService;
