const { User } = require("../db.js");

module.exports = async function(req, res, next) {
    const usuario = req.user
    const user = await User.findByPk(usuario.id)
    if (!user.admin) return res.status(400).send({ message: "Sin autorización", status: 400 })
    next()
}