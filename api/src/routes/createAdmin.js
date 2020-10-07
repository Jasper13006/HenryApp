const server = require('express').Router()
const { User } = require('../db.js')
const { createAdmin } = require('../controllers/createAdmin')

server.post('/', createAdmin)

module.exports = server