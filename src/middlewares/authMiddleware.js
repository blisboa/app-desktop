const jwt = require("jsonwebtoken")

require("dotenv").config()

// Clave secreta usada para firmar y verificar los tokens JWT
const SECRET = process.env.PORTAFOLIO_JWT_SECRET

/*
Middleware de autenticación.

Este middleware se ejecuta antes de que el request llegue
al controlador de la API.

Su objetivo es verificar que el usuario esté autenticado
mediante un token JWT.
*/
const verificarToken = (req, res, next) => {

    /*
    El cliente (frontend) debe enviar el token en el header:

    Authorization: Bearer <token>
    */
    const authHeader = req.headers.authorization

    // Si el header no existe, significa que el usuario
    // no envió el token, por lo tanto no está autenticado
    if (!authHeader) {
        return res.status(401).json({ mensaje: "token requerido" })
    }

    /*
    El formato del header es:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

    Por eso se divide el texto usando espacio para obtener
    solo el token.
    */
    const token = authHeader.split(" ")[1]

    try {

        /*
        jwt.verify hace dos cosas importantes:

        1) Verifica que el token fue firmado con nuestro SECRET
        2) Verifica que el token no esté expirado

        Si todo es correcto devuelve el contenido del token
        (payload).
        */
        const decoded = jwt.verify(token, SECRET)

        /*
        El payload del token queda disponible en decoded.

        Ejemplo de payload:

        {
            id_usuario: "JFLORES",
            iat: 1710000000,
            exp: 1710007200
        }

        Guardamos esta información en req.usuario para que
        los controladores puedan saber qué usuario está
        haciendo la petición.
        */
        req.usuario = decoded

        /*
        next() permite continuar hacia el siguiente paso
        del flujo (normalmente el controlador de la API).
        */
        next()

    } catch (err) {

        /*
        Si el token es inválido o fue modificado,
        jwt.verify lanza un error.

        En ese caso se bloquea la petición.
        */
        return res.status(401).json({ mensaje: "token inválido" })

    }

}

module.exports = { verificarToken }