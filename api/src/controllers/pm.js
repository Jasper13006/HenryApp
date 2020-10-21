const { Cohorte, User, Grouppm, Student } = require("../db.js");


module.exports = {

  //////////////////////
  //// crea el grupo PM
  /////////////////////

  async createPmGroup(req, res) {
    const { name, PM1Id, PM2Id, cohorteId } = req.body;
    const usuario = req.user
    const user = await User.findByPk(usuario.id)
    if (!user.admin && !user.instructor) return res.status(403).send({ message: "Sin autorización", status: 400 })

    if (!name || !PM1Id || !PM2Id || !cohorteId) {
      return res.status(400).send({ message: "Faltan campos obligatorios", status: 400 });
    }

    const PM1 = await User.findByPk(PM1Id)
    const PM2 = await User.findByPk(PM2Id)
    if (!PM1.pm || !PM2.pm) {
      return res.status(400).send({ message: "Los id's no son PM's", status: 400 });
    }

    try {
      const newPmGroup = await Grouppm.create({ name, PM1Id, PM2Id, cohorteId })
      res.status(201).send(newPmGroup)
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  },


  /////////////////////////////////////////////////
  //// Agregar estudiante a los pms y pps o editarlos
  ///////////////////////////////////////////
  async editStudent(req, res) {
    const { id } = req.params
    const { userId, grouppmId, grouppId } = req.body
    try {
      const student = await Student.findOne({
        where: {
          userId: userId,
          cohorteId: id
        }
      })
      if (!student) {
        return res.status(400).send({ message: 'este usuario no existe en el cohorte' })
      }

      student.grouppmId = grouppmId || student.grouppmId;
      student.grouppId = grouppId || student.grouppId;
      student.save()
      return res.status(200).send(student)
    } catch (err) {
      console.log('err', err)
    }
  },

  /////////////////////////////////////////////////
  //// Trae a los estudiante de un grupo pm
  ///////////////////////////////////////////
  async getGroupPm(req, res) {
    const { id } = req.params
    const usuario = req.user
    const user = await User.findByPk(usuario.id)
    if (!user.admin && !user.instructor) return res.status(403).send({ message: "Sin autorización", status: 400 })
    try {

      const gpm = await Grouppm.findOne({
        where: {
          id: id
        },
        include: [
          { model: User, as: 'PM1' },
          { model: User, as: 'PM2' },

        ]
      })
      if (!gpm) return res.status(404).send({ message: 'No se encontro ningun grupo con este ID', status: 404 })
      const students = await Student.findAll({
        where: {
          grouppmId: id
        },
        include: [
          { model: User },
        ]
      })
      return res.status(200).send({ gpm, students })
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  },

  /////////////////////////////////////////////////
  //// Edita los campos PM1 y PM2 de un grupo pm.
  ///////////////////////////////////////////
  async editGroupPm(req, res) {
    const { id } = req.params
    const { PM1Id, PM2Id, name, cohorteId } = req.body

    if (PM1Id) {
      const PM1 = await User.findByPk(PM1Id)
      if (!PM1.pm) {
        return res.status(400).send({ message: "PM1 no es un PM" });
      }
    }
    if (PM2Id) {
      const PM2 = await User.findByPk(PM2Id)
      if (!PM2.pm) {
        return res.status(400).send({ message: "PM2 no es un PM" });
      }
    }
    try {
      const group = await Grouppm.findByPk(id)
      console.log(id)
      if (!group) return res.status(404).send({ message: 'No se encontro ningun grupo con este id' })
      group.PM1Id = PM1Id || group.PM1Id;
      group.PM2Id = PM2Id || group.PM2Id;
      group.name = name || group.name;
      group.cohorteId = cohorteId || group.cohorteId;
      group.save()
      return res.status(200).send(group)
    } catch (err) {
      return res.status(500).send(err)
    }
  },

}