const server = require("express").Router();
const authenticate = require('../utils/auth');
const isAdmin = require('../utils/isAdmin');
const { getStudents, getStudentById, getStudentsByCohorteId, getStudentsByGrouppmId, getStudentByUserId } = require('../controllers/student')

//consultar por todos los alumnos
server.get("/", getStudents)

//consultar por la información de un alumno
server.get("/:id", getStudentById)

//consultar por los alumnos de determinado cohorte
server.get("/cohorte/:id", getStudentsByCohorteId)

//consultar por los alumnos de un grupo pm
server.get("/group-pm/:id", getStudentsByGrouppmId)

//consultar info de student por userId 
server.get("/info/:id", getStudentByUserId)

module.exports = server;
