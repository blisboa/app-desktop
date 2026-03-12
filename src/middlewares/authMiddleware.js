const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET = process.env.PORTAFOLIO_JWT_SECRET;
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ mensaje: "token requerido" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: "token inválido" });
  }
};

module.exports = { verificarToken };
