const server = require("express").Router();
const authenticate = require('../utils/auth')
const { getUsers, getOneUser, registerUser, loginUser, promoteUser, userProfile, getInstructors, getPms } = require('../controllers/user')

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
server.put('/profile/:id', authenticate, userProfile)

//Obtener users q sean instructores
server.get("/instructor", getInstructors)
  
 //Obtener users q sean pm's
server.get("/pms", getPms)

module.exports = server;