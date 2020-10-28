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
  // un solo grupo
  async groupPPbyPmId(req, res){
    const { grouppmId, cohorteId } = req.params
    try{
      const groupPp = await Groupp.findOne({
        where: {
          cohorteId: cohorteId,
          grouppmId: grouppmId
        }
      })
      const students = await Student.findAll({
        where: { 
          grouppId: groupPp.id
        }
      })
      return res.status(200).json({groupPp, students});
    }catch(error){
      console.log(error.message)
      return res.status(500).send(error)
    }
  },


  // todos los grupos de un PM
  async groupsPPbyPmId(req, res){
    const { grouppmId } = req.params
    
    try{
      const groupPp = await Groupp.findAll({
        where: {
          grouppmId: grouppmId
        }
      })
      return res.status(200).json(groupPp);
    }catch(error){
      return res.status(500).send(error)
    }
  },

}