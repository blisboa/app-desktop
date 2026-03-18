const pool = require('../config/database');

const Operacion = {
  async buscar({ id_fondo, fecha_desde, fecha_hasta, tipo }) {
    let query = `
      SELECT 
        o.id_operacion,
        o.id_fondo,
        f.nombre as fondo_nombre,
        o.tipo,
        o.fecha,
        o.monto,
        d.correlativo,
        d.id_nemotecnico,
        d.cantidad,
        d.precio
      FROM operacion o
      JOIN fondo f ON f.id_fondo = o.id_fondo
      LEFT JOIN operacion_detalle d ON d.id_operacion = o.id_operacion
      WHERE 1=1
    `;

    const params = [];
    let i = 1;

    if (id_fondo) {
      query += ` AND o.id_fondo = $${i++}`;
      params.push(id_fondo);
    }

    if (tipo) {
      query += ` AND o.tipo = $${i++}`;
      params.push(tipo);
    }

    if (fecha_desde) {
      query += ` AND o.fecha >= $${i++}`;
      params.push(fecha_desde);
    }

    if (fecha_hasta) {
      query += ` AND o.fecha <= $${i++}`;
      params.push(fecha_hasta);
    }

    query += ` ORDER BY o.fecha DESC, o.id_operacion`;

    const res = await pool.query(query, params);
    return res.rows;
  },
  async crearCompra({ id_fondo, fecha, detalles }) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // 1. generar id (simple)
      const resId = await client.query(
        'SELECT COALESCE(MAX(id_operacion),0) + 1 as id FROM operacion'
      );
      const id_operacion = resId.rows[0].id;

      // 2. insertar encabezado
      let montoTotal = detalles.reduce((acc, d) => acc + d.cantidad * d.precio, 0);

      await client.query(
        `INSERT INTO operacion (id_operacion, id_fondo, tipo, fecha, monto)
         VALUES ($1, $2, 'C', $3, $4)`,
        [id_operacion, id_fondo, fecha, montoTotal]
      );

      // 3. insertar detalles
      let correlativo = 1;

      for (const d of detalles) {
        await client.query(
          `INSERT INTO operacion_detalle 
           (id_operacion, correlativo, id_nemotecnico, cantidad, precio)
           VALUES ($1, $2, $3, $4, $5)`,
          [id_operacion, correlativo++, d.id_nemotecnico, d.cantidad, d.precio]
        );
      }

      await client.query('COMMIT');

      return { id_operacion };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
};

module.exports = Operacion;
