const { Cohorte, User, Student, Grouppm } = require("../db.js");
const grouppm = require("../models/grouppm.js");
const student = require("./student.js");

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
      const cohortes = await Cohorte.findAll({
        order: [['id', 'ASC']]
      })
      if (cohortes && cohortes.length === 0) {
        return res.status(404).send({ message: "No hay cohortes" });
      }
      res.status(200).send(cohortes);
    } catch (error) {
      console.log(error)
    }
  },

  async getCohortesId(req, res) {
    const { id } = req.params
    try {
      const cohorteId = await Cohorte.findOne({
        where: {
          id: id
        },
        include: [{ model: User, as: "instructor" },]
      })
      if (!cohorteId) {
        return res.status(404).send({ message: 'Ningun cohorte ha sido encontrado con ese ID' })
      }
      return res.status(200).send(cohorteId)
    } catch (err) { console.log(err) }
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
        return res.status(400).send({ message: 'este usuario ya existe en el cohorte' })
      }
      const newStudent = await Student.create({ userId, cohorteId: id })
      return res.send(newStudent)
    } catch (err) {
      console.log('err', err)
    }
  },

  async getGourpmbyCohorte(req, res) {
    try {
      let result = []
      const grouppms = await Grouppm.findAll({
        where: {
          cohorteId: req.params.id,
        },
        include: [
          { model: User, attributes: ["name", "lastName", "id"], as: 'PM1' },
          { model: User, as: 'PM2', attributes: ["name", "lastName", "id"] },
        ],
        order: [['id', 'ASC']],
        attributes: ["name", "id"]
      })
      if (!grouppms) return res.send({ message: 'no hay grupos de pms en este cohorte', status: 400 })
      for (let index = 0; index < grouppms.length; index++) {
        const student = await Student.findAll({
          where: {
            grouppmId: grouppms[index].id,
            cohorteId: req.params.id,
          },
          include: [{
            model: User,
            attributes: ["name", "lastName", "id"]
          }],
          attributes: ["cohorteId", "id", "grouppmId"]
        })
        result.push({ groupPm: grouppms[index], students: student })
      }
      return res.send(result)
    } catch (error) {
      console.log(error)
    }
  },

  async modifyCohort(req, res) {
    const { id } = req.params
    const { name, date, instructorId } = req.body
    if (!name && !date && !instructorId) return res.status(400).json({ message: "para modificar un cohorte debes integrar el campo que quieres que cambie" })
    try {
      const cohort = await Cohorte.findOne({
        where: {
          id: id
        }
      })
      console.log(cohort)
      cohort.name = name || cohort.name
      cohort.date = date || cohort.date
      cohort.instructorId = instructorId || cohort.instructorId
      cohort.save()
      return res.status(201).json(cohort)
    } catch {
      return res.status(401).json({ message: "No se pudo encontrar el cohorte que quiere modificar" })
    }
  }
}