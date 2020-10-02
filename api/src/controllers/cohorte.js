const { Cohorte, User, Grouppm, Student } = require("../db.js");
const grouppm = require("../models/grouppm.js");

module.exports = {

  /////////////////////
  //// Crea un cohorte
  /////////////////////
  async createCohorte(req, res) {
    const { name, date, instructorId } = req.body;

    const usuario = req.user

    const user = await User.findByPk(usuario.id)
    if (!user.admin) return res.status(400).send({ message: "Sin autorización", status: 400 })

    if (!name || !date || !instructorId) {
      return res.status(400).send({ message: "Faltan campos obligatorios", status: 400 });
    }

    const user2 = await User.findByPk(instructorId)
    if (!user2.instructor) {
      return res.status(400).send({ message: "No es instructor el id otorgado", status: 400 });
    }

    try {
      const cohorteData = { name, date, instructorId };
      const newCohorte = await Cohorte.create(cohorteData)
      return res.status(201).send(newCohorte)
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }

  },

  async getCohortes(req, res) {
    try {
      const cohortes = await Cohorte.findAll()
      if (cohortes && cohortes.length === 0) {
        return res.status(404).send({ message: "No hay cohortes" });
      }
      res.status(200).send(cohortes);
    } catch (error) {
      console.log(error)
    }
  },

  ///////////////////////////////////
  //// Agregar estudiante al cohorte
  //////////////////////////////////

  async addStudent(req, res) {
    const { id } = req.params
    const { userId } = req.body
    try {

      const student = await Student.findOne({
        where: {
          userId: userId,
        }
      })
      if (student) {
        return res.status(400).send({ msg: 'este usuario ya existe en el cohorte' })
      }
      const newStudent = await Student.create({ userId, cohorteId: id })
      return res.send(newStudent)
    } catch (err) {
      console.log('err', err)
    }
  }
}