const server = require('express').Router()
// const { User } = require('../db.js')
const { createCalendar, getEvents, deleteEvent } = require('../controllers/calendar')

server.get('/:id', getEvents)

server.post('/createEvent', createCalendar)

server.delete('/deleteEvent', deleteEvent)

module.exports = server