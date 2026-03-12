/*
index.js = punto de entrada
routes   = definen URLs
controllers = lógica HTTP
services = acceso a datos
*/

const express = require("express")
const cors = require("cors")
const authRoutes = require("./src/routes/authRoutes")
const menuRoutes = require("./src/routes/menuRoutes")
const loggerMiddleware = require('./src/middlewares/logger.middleware');

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use(loggerMiddleware);

app.use("/api/auth",authRoutes)
app.use("/api/menu",menuRoutes)

app.get("/",(req,res)=>{
  res.send("API funcionando")
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log("Servidor escuchando en http://localhost:"+PORT)
})