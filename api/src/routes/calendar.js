const server = require('express').Router()
// const { User } = require('../db.js')
const { createCalendar, getEvents } = require('../controllers/calendar')

server.get('/:id', getEvents)

server.post('/createEvent', createCalendar)

module.exports = server