const { Modulo, User } = require("../db.js");


module.exports = {
  // calificar checkpoint del alumno
  async createModulo(req, res) {
    const { name, nameClass, description, curso, linkVideos, cohorteId } = req.body

    const usuario = req.user

    const user = await User.findByPk(usuario.id)
    if (!user.admin) return res.status(400).send({ message: "Sin autorización", status: 400 })

    if (!name || !nameClass || !description || !linkVideos || !cohorteId) {
      return res.status(400).send({ message: "Faltan campos obligatorios", status: 400 });
    }

    try {
      const moduloData = { name, nameClass, description, curso, linkVideos, cohorteId };
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
  },

  
  async editModulos (req, res) {
    const { id } = req.params;
    const { name, nameClass, description, linkVideos, curso, cohorteId } = req.body;
  
    try {
      const modulo = await Modulo.findOne({ where: { id: id } });
      if (!modulo) {
        return res.send({
          message: `No se encontro el modulo con ID: ${id}`,
        });
      }
      const moduloUpdated = await modulo.update({
        name: name || modulo.name,
        nameClass: nameClass || modulo.nameClass,
        description: description || modulo.description,
        linkVideos: linkVideos || modulo.linkVideos,
        curso: curso || modulo.curso,
        cohorteId: cohorteId || modulo.cohorteId
      });
      return res.send(moduloUpdated);
    } catch (error) {
      console.log(error);
    }
  },

  async getVideosByCohorteId (req, res) {
    const { id } = req.params

    try {
    const data = await Modulo.findAll({
      where: {
        cohorteId: id
      }
    })
    return res.send(data)
  } catch (err) { console.log(err) }
  }

}