const { User, Checkpoint } = require("../db.js");


module.exports = {
  // calificar checkpoint del alumno
  async calificarAlumno(req, res) {
    const { name, qualification, info } = req.body
    const { userId } = req.params
    if(!name || !qualification) {
      return res.status(400).send({ message: 'Debe proporcionar un nombre para el checkpoint y la calificacion' })
    }
    try {
      const alumno = await User.findOne({
        where: {
          id: userId
        }
      })
      if (!alumno) return res.status(404).send({ message: 'No existe ningun alumno con ese ID' })

      const calificacion = { name, qualification, info, userId }
      const nuevaCalificacion = await Checkpoint.create(calificacion)
      return res.status(201).send(nuevaCalificacion)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
}