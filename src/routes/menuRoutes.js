const express = require("express")
const router = express.Router()

const { verificarToken } = require("../middlewares/authMiddleware")
const { getMenus } = require("../controllers/menuController")

router.get("/", verificarToken, getMenus)
//router.get("/", getMenus)


module.exports = router