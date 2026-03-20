const Instrumento = require('./instrumento');

const instrumentoModel = {
  async getAll() {
    return await Instrumento.findAll({
      order: [['id_instrumento', 'ASC']],
    });
  },

  async getById(id) {
    return await Instrumento.findByPk(id);
  },

  async create(data) {
    return await Instrumento.create(data);
  },

  async update(id, data) {
    const instrumento = await Instrumento.findByPk(id);
    if (!instrumento) return null;
    await instrumento.update(data);
    return instrumento;
  },

  async delete(id) {
    const instrumento = await Instrumento.findByPk(id);
    if (!instrumento) return null;
    await instrumento.destroy();
    return instrumento;
  },
};

module.exports = instrumentoModel;
