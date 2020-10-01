const { Cohorte, User, Grouppm } = require("../db.js");
const grouppm = require("../models/grouppm.js");

module.exports = {

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

      async createPmGroup (req, res) {
        const { name, students, PM1Id, PM2Id, cohorteId } = req.body;
        
        const usuario = req.user     
        const user = await User.findByPk(usuario.id)
        if (!user.admin) return res.status(400).send({ message: "Sin autorización", status: 400 })

        if (!name || !students || !PM1Id || !PM2Id || !cohorteId) {
          return res.status(400).send({ message: "Faltan campos obligatorios", status: 400 });
        }

        const PM1 = await User.findByPk(PM1Id)
        const PM2 = await User.findByPk(PM2Id)
        if (!PM1.pm && !PM2.pm) {
          return res.status(400).send({ message: "Los id's no son PM's", status: 400 });
        }

        try {
          const PmGroup = { name, students, PM1Id, PM2Id, cohorteId };
          let newPmGroup;
          students.map(async student => {
            newPmGroup = await Grouppm.create({name, student, PM1Id, PM2Id, cohorteId})
            newPmGroup.setStudents(student)
          })
          res.status(201).send(newPmGroup)
          console.log(newPmGroup)
        } catch (err) {
          console.log(err)
          return res.status(500).send(err)
        }
      },

      async getGroupPm (req, res) {
        const { id } = req.params
        try {
          const gpm = await Grouppm.findOne({
            where: {
              id: id
            },
            include:[
              {model: User, as: 'students'}
          ]
          })
          if (!gpm) return res.status(404).send({msg: 'No se encontro ningun grupo con este ID', status: 404})
          return res.status(200).send(gpm)
        } catch (err) {
          console.log(err)
          return res.status(500).send(err)
          }
      }








}