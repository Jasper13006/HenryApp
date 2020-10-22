const server = require("express").Router();
const {CreateMsg,getChat,getMsg,editChat} = require('../controllers/msg')
const authenticate = require('../utils/auth');

server.post('/',authenticate,CreateMsg)
server.get('/chat',authenticate,getChat)
server.get('/:chatId',authenticate,getMsg)
server.put('/chat/:chatId',authenticate,editChat)

module.exports=server;