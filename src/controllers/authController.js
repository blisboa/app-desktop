const jwt = require("jsonwebtoken")
const { loginUsuario } = require("../services/authService")

require("dotenv").config()
const SECRET = process.env.PORTAFOLIO_JWT_SECRET

const login = async (req, res) => {
    const { usuario, clave } = req.body
    const user = await loginUsuario(usuario, clave)
    if (!user) {
        return res.status(401).json({ mensaje: "clave incorrecta" })
    }

    console.log('nombre:',user.nombre);
    const token = jwt.sign(
        { id_usuario: user.id_usuario },
        SECRET,
        { expiresIn: "2h" }
    )

    res.json({
        token: token,
        usuario: user
    })
}

module.exports = { login }