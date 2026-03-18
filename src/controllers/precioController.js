const Precio = require('../models/precioModel');
const log = require('../utils/fileLogger');

const controller = {
  async subirArchivo(req, res) {
    try {
      const archivo = req.file;

      console.log('controlerr precio 1');

      if (!archivo) {
        return res.status(400).json({ error: 'Archivo requerido' });
      }

      console.log('controlerr precio 2');
      const result = await Precio.cargarArchivo(archivo.path);

      res.json({
        mensaje: 'Archivo procesado correctamente',
        ...result,
      });
    } catch (error) {
      log(`Cargar Precios| ${error.stack}`);
      console.error(error);
      res.status(500).json({ error: 'Error procesando archivo' });
    }
  },
};

module.exports = controller;
