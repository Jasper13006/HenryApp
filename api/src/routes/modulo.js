const server = require("express").Router();
const { createModulo, getModulos, editModulos, getVideosByCohorteId } = require('../controllers/modulo')
const authenticate = require('../utils/auth');

// Get de todos los modulos
server.get('/', getModulos)

//Ruta crear modulo
server.post('/create', authenticate, createModulo)

// Editar modulo
server.put("/:id", authenticate, editModulos)

server.get('/:id', authenticate, getVideosByCohorteId)

module.exports = server;