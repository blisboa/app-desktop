/*

Capas/Layer:
index.js = punto de entrada
routes   = definen URLs
controllers = lógica HTTP
services = logica de negocio
modelo = acceso a sql
*/

const express = require('express');
const cors = require('cors');

// rutas
const authRoutes = require('./src/routes/authRoutes');
const menuRoutes = require('./src/routes/menuRoutes');
const instrumentoRoutes = require('./src/routes/instrumentoRoutes');
const emisorRoutes = require('./src/routes/emisorRoutes');
const operacionRoutes = require('./src/routes/operacionRoutes');
const fondoRoutes = require('./src/routes/fondoRoutes');
const nemotecnicoRoutes = require('./src/routes/nemotecnicoRoutes');
const precioRoutes = require('./src/routes/precioRoutes');
// log
const loggerMiddleware = require('./src/middlewares/logger.middleware');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(loggerMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/instrumento', instrumentoRoutes);
app.use('/api/emisor', emisorRoutes);
app.use('/api/operaciones', operacionRoutes);
app.use('/api/fondos', fondoRoutes);
app.use('/api/nemotecnicos', nemotecnicoRoutes);
app.use('/api/precios', precioRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor escuchando en http://localhost:' + PORT);
});
