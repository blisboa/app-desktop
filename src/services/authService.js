const pool = require("../config/database")

async function loginUsuario(usuario, clave) {

  /*
  Se ejecuta una consulta SQL usando parámetros.
  $1 y $2 son marcadores de posición que luego se
  reemplazan con los valores enviados en el arreglo.
  Esto evita problemas de seguridad como SQL Injection.
  */
 

  const result = await pool.query(

    `SELECT id_usuario, concat(nombre , ' ',apellido1,' ',apellido2) as nombre
     FROM usuario
     WHERE id_usuario = $1
     AND clave = $2
     AND estado = 'V'`,

    // Valores que reemplazan $1 y $2
    [usuario, clave]
  )

  /*
  result.rows contiene un arreglo con los registros encontrados.

  Ejemplo:
  [
    { id_usuario: 'JFLORES', nombre: 'Juan' }
  ]

  Como el login debería encontrar solo un usuario,
  se devuelve el primer elemento del arreglo.
  En caso que no coincida clave ni usuario, se devuelve vacio [].
  */
  return result.rows[0]

}

module.exports = { loginUsuario }