const server = require("express").Router();
const authenticate = require('../utils/auth');
const { createCohorte, getCohortes, createPmGroup, getGroupPm } = require('../controllers/cohorte')
const isAdmin = require('../utils/isAdmin')

//Ruta obtener todos los cohortes
server.get("/", getCohortes);

//Ruta crear usuario
server.post("/create", authenticate, createCohorte);

server.post('/create-pmgroup', authenticate, createPmGroup)

server.get('/group-pm/:id', authenticate, isAdmin, getGroupPm)

module.exports = server;