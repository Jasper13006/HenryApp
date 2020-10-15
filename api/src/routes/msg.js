const server = require("express").Router();
const {CreateMsg} = require('../controllers/msg')

server.post('/',CreateMsg)

module.exports=server;