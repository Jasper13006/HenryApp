const server = require("express").Router();
const {CreateMsg,getChat} = require('../controllers/msg')
const authenticate = require('../utils/auth');

server.post('/',authenticate,CreateMsg)

server.get('/chat',authenticate,getChat)

module.exports=server;