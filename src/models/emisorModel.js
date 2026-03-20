const pool = require('../config/database');

const Emisor = {
  async getAll() {
    const res = await pool.query('SELECT * FROM emisor ORDER BY id_emisor');
    return res.rows;
  },

  async getById(id) {
    const res = await pool.query('SELECT * FROM emisor WHERE id_emisor = $1', [id]);
    return res.rows[0];
  },

  async create({ id_emisor, razon_social, nombre }) {
    const res = await pool.query(
      'INSERT INTO emisor (id_emisor, razon_social,nombre) VALUES ($1, $2, $3) RETURNING *',
      [id_emisor, razon_social, nombre]
    );
    return res.rows[0];
  },

  async update(id, { razon_social, nombre }) {
    const res = await pool.query(
      'UPDATE emisor SET razon_social=$1, nombre=$2 WHERE id_emisor=$3 RETURNING *',
      [razon_social, nombre, id]
    );
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query('DELETE FROM emisor WHERE id_emisor=$1 RETURNING *', [id]);

    return res.rows[0];
  },
};

module.exports = Emisor;
