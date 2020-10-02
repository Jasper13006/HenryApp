const { Cohorte, User, Grouppm,Student } = require("../db.js");
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

      /////////////////////////////////////////////////
      //// crea el grupo PM
      ///////////////////////////////////////////

      async createPmGroup (req, res) {
        const { name, PM1Id, PM2Id, cohorteId } = req.body;
        const usuario = req.user     
        const user = await User.findByPk(usuario.id)
        if (!user.admin) return res.status(400).send({ message: "Sin autorización", status: 400 })

        if (!name || !PM1Id || !PM2Id || !cohorteId) {
          return res.status(400).send({ message: "Faltan campos obligatorios", status: 400 });
        }

        const PM1 = await User.findByPk(PM1Id)
        const PM2 = await User.findByPk(PM2Id)
        if (!PM1.pm && !PM2.pm) {
          return res.status(400).send({ message: "Los id's no son PM's", status: 400 });
        }

        try {
          let newPmGroup;
      
          newPmGroup = await Grouppm.create({name,  PM1Id, PM2Id, cohorteId}) 
          res.status(201).send(newPmGroup)
        } catch (err) {
          console.log(err)
          return res.status(500).send(err)
        }
      },

      /////////////////////////////////////////////////
      //// Agregar estudiante al cohorte
      ///////////////////////////////////////////

      async addStudent (req,res){
        const {id} = req.params
        const {userId} = req.body
        try{   

          const student = await Student.findOne({
            where: {
              userId:userId,
            }
          })
          if(student){
            return res.status(400).send({msg:'este usuario ya existe en el cohorte'})
          }
          const newStudent = await Student.create({userId,cohorteId:id})
          return res.send(newStudent)                        
        } catch(err){
          console.log('err',err)
        }
      },

      /////////////////////////////////////////////////
      //// Agregar estudiante a los pms y pps
      ///////////////////////////////////////////
      async editStudent (req,res){
        const {id} = req.params
        const {userId,grouppmId,groupPPId} = req.body
        try{   

          const student = await Student.findOne({
            where: {
              userId:userId,
              cohorteId:id
            }
          })
          if(!student){
            return res.status(400).send({msg:'este usuario no existe en el cohorte'})
          }

          student.grouppmId = grouppmId || student.grouppmId;
          student.groupPP = groupPPId || student.groupPP;
          student.save() 
          return res.status(200).send(student)                        
        } catch(err){
          console.log('err',err)
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
              {model: User, as: 'PM1'},
              {model:User, as:'PM2'},
        
          ]
          }) 
          if (!gpm) return res.status(404).send({msg: 'No se encontro ningun grupo con este ID', status: 404})
          const students = await Student.findAll ({
            where:{
              grouppmId:id
            },
            include:[
              {model: User},
            ]
          })
          return res.status(200).send({gpm,students})
        } catch (err) {
          console.log(err)
          return res.status(500).send(err)
        }
      },

      async editGroupPm (req,res)  {
        const {id} = req.params
        const {PM1Id,PM2Id,students} = req.body
        if(PM1Id){
          const PM1 = await User.findByPk(PM1Id)
          if (!PM1.pm ) {
            return res.status(400).send({ message: "PM1 no es un PM", status: 400 });
          }
        }
        if(PM2Id){
          const PM2 = await User.findByPk(PM2Id)
        if (!PM2.pm) {
          return res.status(400).send({ message: "PM2 no es un PM", status: 400 });
        }
        }
        

        try  {
          const group = await Grouppm.findByPk(id)
          if(!group) return res.status(404).send({msg:'No se encontro ningun grupo con este id'})
          group.PM1Id = PM1Id || group.PM1Id;
          group.PM2Id = PM2Id || group.PM2Id;
          group.students = students || group.students
          group.save()
          return res.status(200).send(group)
        } catch (err){
          return res.status(500).send(err)
        }
      }








}