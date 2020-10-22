const server = require('express').Router()
// const { User } = require('../db.js')
const { createCalendar, getEvents, deleteEvent, modifyEvent } = require('../controllers/calendar')

server.get('/:id', getEvents)

server.post('/createEvent', createCalendar)

server.delete('/deleteEvent', deleteEvent)

server.put('/editEvent', modifyEvent)

module.exports = server