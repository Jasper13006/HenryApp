const server = require("express").Router();
const authenticate = require('../utils/auth');
const isAdmin = require('../utils/isAdmin');
const { getStudents, getStudentById, getStudentsByCohorteId, getStudentsByGrouppmId, getStudentByUserId, getGroupPmbyCohorte, modifyStudent } = require('../controllers/student')

//consultar por todos los alumnos
server.get("/", authenticate, getStudents)

//consultar por la información de un alumno
server.get("/:id", authenticate, getStudentById)

//consultar por los alumnos de determinado cohorte
server.get("/cohorte/:id", authenticate, getStudentsByCohorteId)

//consultar por los alumnos de un grupo pm
server.get("/group-pm/:id", authenticate, getStudentsByGrouppmId)

//consultar info de student por userId 
server.get("/info/:id", authenticate, getStudentByUserId)

//modificar un perfil de estudiante.
server.put("/modify/:studentId", authenticate, isAdmin, modifyStudent)



module.exports = server;
