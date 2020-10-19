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
  },

  async getNotasByUserId(req, res) {
    try {
      await Checkpoint.findAll({
        where: {
          userId: req.params.id,
        },
        })
        .then((notas) => {
          if (notas && notas.length === 0) {
            return res.send('');
          }
          res.status(200).send(notas);
        })
    } catch (error) {
      console.log(error)
    }
  },

  async getNotaRepetida(req, res) {
    const { name } = req.body
    console.log(name)
    try {
      await Checkpoint.findAll({
        where: {
          userId: req.params.id,
          name: name
        },
        })
        .then((notas) => {
          if (notas && notas.length === 0) {
            return res.send(false);
          }
          res.status(200).send(true);
        })
    } catch (error) {
      console.log(error)
    }
  },

  async editNota(req, res){
    const { id } = req.params
    const { name, qualification, info } = req.body
    if(!name && !qualification) return res.status(400).json({message: "faltan campos necesarios"})
    try {
      const check = await Checkpoint.findOne({
        where: {
          userId: id,
          name: name
        }
      })              
        check.qualification = qualification || check.qualification
        check.info = info|| check.info
        check.save()
        return  res.status(201).json(check)
    }catch{
      return res.json({message: "Error"})
    }
  }
}