const server = require("express").Router();
const authenticate = require('../utils/auth')
const isAdmin = require('../utils/isAdmin')
const { getUsers, getOneUser, registerUser, loginUser, promoteUser, userEditProfile, getInstructors, getPms } = require('../controllers/user')
const { calificarAlumno } = require('../controllers/checkpoints')




//Rutar obtener todos los usuarios
server.get("/", getUsers);

//Ruta crear usuario
server.post("/register", registerUser);

// ruta login
server.post("/login", loginUser);

// busca usuario por id
server.get('/:id', authenticate, getOneUser )

//promover o quitar de admin, pm o instructor, active (bloquear y desbloquear usuario)
server.put('/promote/:id', authenticate, promoteUser)

//modificar datos usuario
server.put('/profile/:id', authenticate, userEditProfile)

//Obtener users q sean instructores
server.get("/instructor", getInstructors)
  
 //Obtener users q sean pm's
server.get("/pms", getPms)

// calificar checkpoint del alumno
server.post('/nota-checkpoint/:userId', authenticate, isAdmin, calificarAlumno)

module.exports = server;