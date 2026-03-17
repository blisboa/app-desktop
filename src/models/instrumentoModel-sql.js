const pool = require("../config/database");

const Instrumento = {
  async getAll() {
    const res = await pool.query(
      "SELECT * FROM instrumento ORDER BY id_instrumento",
    );
    return res.rows;
  },

  async getById(id) {
    const res = await pool.query(
      "SELECT * FROM instrumento WHERE id_instrumento = $1",
      [id],
    );
    return res.rows[0];
  },

  async create({ id_instrumento, nombre, tipo_mercado }) {
    const res = await pool.query(
      "INSERT INTO instrumento (id_instrumento, nombre, tipo_mercado) VALUES ($1, $2, $3) RETURNING *",
      [id_instrumento, nombre, tipo_mercado],
    );
    return res.rows[0];
  },

  async update(id, { nombre, tipo_mercado }) {
    const res = await pool.query(
      "UPDATE instrumento SET nombre=$1, tipo_mercado=$2 WHERE id_instrumento=$3 RETURNING *",
      [nombre, tipo_mercado, id],
    );
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query(
      "DELETE FROM instrumento WHERE id_instrumento=$1 RETURNING *",
      [id],
    );
    return res.rows[0];
  },
};

module.exports = Instrumento;
