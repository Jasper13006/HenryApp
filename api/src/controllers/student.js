const { Student, Cohorte, User, Grouppm, } = require("../db.js");


module.exports = {
  //////////////////////
  //// consulta todos los estudiantes
  /////////////////////

  async getStudents(req, res) {
    try {
      await Student.findAll({
        include: [
          {
            model: User,
          },
        ],
      })
        .then((students) => {
          if (students && students.length === 0) {
            return res.status(404).send({ message: "No hay estudiantes" });
          }
          res.status(200).send(students);
        })
    } catch (error) {
      console.log(error);
    }
  },


  /////////////////////////////////////////////////
  ////consultar por la información de un alumno(id estudiante)
  ///////////////////////////////////////////
  async getStudentById(req, res) {
    try {
      await Student.findAll({
        where: {
          userId: req.params.id,
        },
        include: [
          {
            model: User,
          },
        ],
      })
        .then((student) => {
          if (student && student.length === 0) {
            return res.status(404).send({ message: "No hay estudiante con ese Id" });
          }
          res.status(200).send(student);
        })
    } catch (error) {
      console.log(error)
    }
  },

  /////////////////////////////////////////////////
  //// Trae a los estudiante de un cohorte
  ///////////////////////////////////////////
  async getStudentsByCohorteId(req, res) {
    try {
      await Student.findAll({
        where: {
          cohorteId: req.params.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "lastName", "email"],
          },
          {
            model: Cohorte,
            attributes: ["name"],
          },
        ],
      })
        .then((students) => {
          if (students && students.length === 0) {
            return res.status(404).send({ message: "No hay estudiantes para ese cohorte" });
          }
          res.status(200).send(students);
        })
    } catch (error) {
      console.log(error)
    }
  },

  /////////////////////////////////////////////////
  //// Trae a los estudiante de un grupo pm
  ///////////////////////////////////////////

  async getStudentsByGrouppmId(req, res) {
    try {
      await Student.findAll({
        where: {
          grouppmId: req.params.id,
        },
        include: [
          {
            model: Grouppm,
          },
          {
            model: User,
            attributes: ["name", "lastName", "email"],
          },
        ],
      })
        .then((students) => {
          if (students && students.length === 0) {
            return res.status(200).send({ message: "No hay estudiantes para ese grupo pm" });
          }
          res.status(200).send(students);
        })
    } catch (error) {
      console.log(error)
    }
  },


  /////////////////////////////////////////////////
  //// trae grupopms por cohorte
  ///////////////////////////////////////////


  async getStudentByUserId(req, res) {

    try {
      Student.findAll({
        where: {
          userId: req.params.id,
        },
        include: [
          {
            model: Cohorte,
          },
          {
            model: Grouppm,
            attributes: ["name"],
          },
        ],
      })


        .then((student) => {
          if (student && student.length === 0) {
            return res.status(404).send({ message: "No hay estudiante con ese UserId" });
          }
          res.status(200).send(student);
        })
    } catch (error) {
      console.log(error)
    }
  },

  /////////////////////////////////////////////////
  //// trae grupopms por cohorte
  ///////////////////////////////////////////
  async getGroupPmbyCohorte(req, res) {
    try {
      Student.findAll({
        where: {
          cohorteId: req.params.id,
        },
        include: [
          {
            model: Grouppm,
            attributes: ["name"],
          },
        ],
      })
        .then((student) => {
          if (student && student.length === 0) {
            return res.status(404).send({ message: "No hay estudiante con ese UserId" });
          }
          res.status(200).send(student);
        })
    } catch (error) {
      console.log(error)
    }
  },
  async modifyStudent(req, res) {
    const { cohorteId } = req.body
    const { studentId } = req.params
    if(!cohorteId || !studentId){
      return res.status(500)
    }
    console.log("este es el id del cohorte: ",cohorteId, "y este el id del student: ", studentId)
    try{
      const estudiante = await Student.findOne({
        where: {id: studentId}
      })
      // console.log(estudiante)
      if(!estudiante){
        return res.status(404)
      }
      if(estudiante.cohorteId === cohorteId){
        return res.status(500).json({message: "el estudiante ya es parte de ese cohorte"})
      }
      const studentModified = await estudiante.update({
        cohorteId: cohorteId,
        migraciones: estudiante.migraciones + 1
      })
      console.log(studentModified)

      res.status(201).json({student: studentModified.id, migraciones: studentModified.migraciones, message: "Estudiante modificado"})
    }catch{
      return res.status(400).json({message: "verifica bien los datos y vuelve a intentarlo..."})
    }
  },
}

