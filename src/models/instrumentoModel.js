const Instrumento = require('./instrumento');

const instrumentoModel = {
  async getAll() {
    console.log('getll orm 1');
    return await Instrumento.findAll({
      order: [['id_instrumento', 'ASC']],
    });
  },

  async getById(id) {
    return await Instrumento.findByPk(id);
  },

  async create(data) {
    console.log('create orm 1', data);
    return await Instrumento.create(data);
  },

  async update(id, data) {
    const instrumento = await Instrumento.findByPk(id);
    if (!instrumento) return null;
    console.log('upadate orm 1', data);
    await instrumento.update(data);
    return instrumento;
  },

  async delete(id) {
    const instrumento = await Instrumento.findByPk(id);
    if (!instrumento) return null;
    console.log('delete  orm 1', data);
    await instrumento.destroy();
    return instrumento;
  },
};

module.exports = instrumentoModel;
