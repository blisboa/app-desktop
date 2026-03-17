const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // importante para Neon
    },
  },

  pool: {
    max: 5,
    min: 0,
    idle: 30000,
  },
});

module.exports = sequelize;
