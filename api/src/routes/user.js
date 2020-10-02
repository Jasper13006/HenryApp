const server = require("express").Router();
const authenticate = require('../utils/auth')
const { getUsers, getOneUser, registerUser, loginUser, promoteUser, userEditProfile, getInstructors, getPms } = require('../controllers/user')
const cloudinary = require ('cloudinary')



//Rutar obtener todos los usuarios
server.get("/", getUsers);

//Ruta crear usuario
server.post("/register", registerUser);

// ruta login
server.post("/login", loginUser);


//promover o quitar de admin, pm o instructor, active (bloquear y desbloquear usuario)
server.put('/promote/:id', authenticate, promoteUser)

//modificar datos usuario
server.put('/profile/:id', authenticate, userEditProfile)

//Obtener users q sean instructores
server.get("/instructor", getInstructors)

//Obtener users q sean pm's
server.get("/pms", getPms)

// busca usuario por id
server.get('/:id', authenticate, getOneUser )

module.exports = server;