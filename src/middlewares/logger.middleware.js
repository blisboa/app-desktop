const log = require('../utils/fileLogger');

// Definimos la función con nombre
function loggerMiddleware(req, res, next) {

    if (
        req.originalUrl.endsWith('.html') ||
        req.originalUrl.startsWith('/api') ||
        req.originalUrl === '/'
    ) {
        log(`${req.method} ${req.originalUrl}`);
    }

    next(); // Continuamos con el siguiente middleware
}

// Exportamos la función
module.exports = loggerMiddleware;