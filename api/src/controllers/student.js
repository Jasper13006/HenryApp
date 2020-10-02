const { Student, Cohorte, User, Grouppm } = require("../db.js");


module.exports = {
   //////////////////////
  //// consulta todos los estudiantes
  /////////////////////

  async getStudents(req, res) {  
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
        .catch((err) => console.log(err));
  },

  
  /////////////////////////////////////////////////
  ////consultar por la información de un alumno(id estudiante)
  ///////////////////////////////////////////
  async getStudentById(req, res) {
    await Student.findAll({
      where: {
        id: req.params.id,
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
      .catch((err) => console.log(err));
     },

  /////////////////////////////////////////////////
  //// Trae a los estudiante de un cohorte
  ///////////////////////////////////////////
  async getStudentsByCohorteId(req, res) {
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
    .catch((err) => console.log(err));
  },

   /////////////////////////////////////////////////
  //// Trae a los estudiante de un grupo pm
  ///////////////////////////////////////////
  
  async getStudentsByGrouppmId(req, res) {  
    await Student.findAll({
        where: {
          grouppmId: req.params.id,
        },
        include: [
          {
            model: Grouppm,
          },
        ],
      })
      .then((students) => {
        if (students && students.length === 0) {
        return res.status(404).send({ message: "No hay estudiantes para ese grupo pm" });
      }
        res.status(200).send(students);
      })
      .catch((err) => console.log(err));
  },

 /////////////////////////////////////////////////
  //// trae estudiante por su userId
  ///////////////////////////////////////////
  async getStudentByUserId(req, res) {  
    Student.findAll({
        where: {
          userId: req.params.id,
        },
        include: [
          {
            model: Cohorte,
            attributes: ["name"],
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
      .catch((err) => console.log(err));
     }
}