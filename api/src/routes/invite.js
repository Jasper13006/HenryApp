const server = require("express").Router();
const {sendInvite} = require('../controllers/invite')
const authenticate = require('../utils/auth');
const isAdmin = require('../utils/isAdmin')

//Invitar alumnos

server.post('/send', sendInvite)


module.exports = server;