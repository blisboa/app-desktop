const pool = require('../config/database');

const Fondo = {
  async getAll() {
    const res = await pool.query(
      "SELECT id_fondo, nombre FROM fondo WHERE vigente = 'V' ORDER BY nombre"
    );
    return res.rows;
  },
};

module.exports = Fondo;
