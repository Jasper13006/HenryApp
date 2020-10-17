const server = require("express").Router();
const {CreateMsg,getChat,getMsg} = require('../controllers/msg')
const authenticate = require('../utils/auth');

server.post('/',authenticate,CreateMsg)

server.get('/chat',authenticate,getChat)

server.get('/:chatId',authenticate,getMsg)

module.exports=server;