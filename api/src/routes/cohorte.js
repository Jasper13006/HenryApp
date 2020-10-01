const server = require("express").Router();
const authenticate = require('../utils/auth');
const { createCohorte, getCohortes } = require('../controllers/cohorte')

//Ruta obtener todos los cohortes
server.get("/", getCohortes);

//Ruta crear usuario
server.post("/create", authenticate, createCohorte);

module.exports = server;