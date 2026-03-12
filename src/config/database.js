const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },

  max: 5, // máximo de conexiones simultáneas
  idleTimeoutMillis: 30000

})

// solo para loguear conexiones
pool.on("connect", () => {
  console.log("Conectado a PostgreSQL (Neon)")
})

// manejar errores del pool
pool.on("error", (err) => {
  console.error("Error inesperado en PostgreSQL", err)
})

module.exports = pool