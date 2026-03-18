const pool = require('../config/database');
const fs = require('fs');

const Precio = {
  async cargarArchivo(rutaArchivo) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
      const lineas = contenido.split('\n');

      let count = 0;

      for (let linea of lineas) {
        if (!linea.trim()) continue;

        const [fecha, nemotecnico, precio] = linea.split(';');

        await client.query(
          `INSERT INTO precio_mercado (fecha, id_nemotecnico, precio)
           VALUES ($1, $2, $3)
           ON CONFLICT (fecha, id_nemotecnico)
           DO UPDATE SET precio = EXCLUDED.precio`,
          [fecha, nemotecnico, precio]
        );

        count++;
      }

      await client.query('COMMIT');

      return { registros: count };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
};

module.exports = Precio;
