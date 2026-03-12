// Importamos el módulo fs para trabajar con el sistema de archivos
const fs = require('fs');


// Función que recibe un mensaje y lo guarda en el archivo de log
function log(mensaje) {

    // Creamos un objeto con la fecha y hora actual
    const ahora = new Date();

    const fecha = ahora.toISOString().split('T')[0];
    const hora = ahora.toTimeString().split(' ')[0];

    const path = require('path');
    const rutaLog = path.join(__dirname, `../../logs/log-${fecha}.txt`);
    const linea = `${fecha} | ${hora} | ${mensaje}\n`;

    // appendFile agrega el contenido al final del archivo
    // Si el archivo no existe, Node lo crea automáticamente
    fs.appendFile(rutaLog, linea, (err) => {

        // Si ocurre un error al escribir, lo mostramos en consola
        if (err) {
            console.error('Error escribiendo log:', err);
        }
    });
}

module.exports = log;