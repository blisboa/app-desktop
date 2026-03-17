const jwt = require('jsonwebtoken');
const { loginUsuario } = require('../services/authService');

require('dotenv').config();
const SECRET = process.env.PORTAFOLIO_JWT_SECRET;

const login = async (req, res) => {
  const { usuario, clave } = req.body;
  const user = await loginUsuario(usuario, clave);
  if (!user) {
    return res.status(401).json({ mensaje: 'clave incorrecta' });
  }

  // si llega a este punto es porque el usuario y clave son correctos
  console.log('nombre:', user.nombre);
  // si la autenticaicon es correctas se crea token
  const token = jwt.sign({ id_usuario: user.id_usuario }, SECRET, { expiresIn: '2h' });

  res.json({
    token: token,
    usuario: user,
  });
};

module.exports = { login };
