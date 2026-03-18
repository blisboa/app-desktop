const pool = require('../config/database');

const Nemotecnico = {
  async buscarPorId(id) {
    const res = await pool.query(
      'SELECT id_nemotecnico FROM nemotecnico WHERE id_nemotecnico = $1',
      [id]
    );
    return res.rows[0];
  },
};

module.exports = Nemotecnico;
