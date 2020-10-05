const { Cohorte, User, Grouppm, Student,Groupp } = require("../db.js");


module.exports = {
  
   //////////////////////
  //// crea el grupo Pp
  /////////////////////

  async createPpGroup(req, res) {
    const { name,grouppmId,cohorteId } = req.body;
    const usuario = req.user
    const user = await User.findByPk(usuario.id)
    if (!user.pm && !user.admin) return res.status(403).send({ message: "Sin autorización", status: 400 })
    if (!name || !grouppmId || !cohorteId) {
      return res.status(400).send({ message: "Faltan campos obligatorios", status: 400 });
    }   

    const cohorte = await Cohorte.findByPk(cohorteId)
    
    const groupPm = await Grouppm.findByPk(grouppmId)
    if(!cohorte || !groupPm){
      return res.status(404).send({ message: "El cohorte o el grupo de Pms no ha sido creado", status: 400 });
    }

    try {
      const newPpGroup = await Groupp.create({name,cohorteId,grouppmId})
      res.status(201).send(newPpGroup)
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  },

  

  

  /////////////////////////////////////////////////
  //// Trae a los estudiante de un grupo pm
  ///////////////////////////////////////////
  async getGroupPp(req, res) {
    const { id } = req.params
    const usuario = req.user
    const user = await User.findByPk(usuario.id)
    if (!user.pm && !user.admin) return res.status(403).send({ message: "Sin autorización", status: 400 })
    try {

      const gpp = await Groupp.findOne({
        where: {
          id: id
        },
      })
      if (!gpp) return res.status(404).send({ message: 'No se encontro ningun grupo con este ID', status: 404 })
      const students = await Student.findAll({
        where: {
          grouppId: id
        },
        include: [
          { model: User },
        ]
      })
      return res.status(200).send({ gpp, students })
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  },


}