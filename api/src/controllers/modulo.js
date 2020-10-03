const { Modulo, User } = require("../db.js");


module.exports = {
  // calificar checkpoint del alumno
  async createModulo(req, res) {
    const { name, nameClass, description, curso, linkVideos } = req.body

    const usuario = req.user

    const user = await User.findByPk(usuario.id)
    if (!user.admin) return res.status(400).send({ message: "Sin autorización", status: 400 })

    if (!name || !nameClass || !description || !linkVideos) {
      return res.status(400).send({ message: "Faltan campos obligatorios", status: 400 });
    }

    try {
      const moduloData = { name, nameClass, description, curso, linkVideos };
      const newModulo = await Modulo.create(moduloData)
      return res.status(201).send(newModulo)
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  },

  async getModulos(req, res) {
    try {
      const modulos = await Modulo.findAll()
      if (modulos && modulos.length === 0) {
        return res.status(404).send({ message: "No hay modulos" });
      }
      res.status(200).send(modulos);
    } catch (err) { console.log(err) }
  }
}