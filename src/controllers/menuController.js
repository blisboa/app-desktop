const { obtenerMenusUsuario } = require("../services/menuService")

const getMenus = async (req, res) => {
    const usuario = req.usuario.id_usuario
    const menus = await obtenerMenusUsuario(usuario)
    res.json(menus)

}

module.exports = { getMenus }