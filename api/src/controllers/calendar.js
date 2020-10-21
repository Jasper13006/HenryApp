const { Calendar } = require("../db.js");

module.exports = {
  async createCalendar(req, res) {
    const { title, start, startRecur, end, endRecur, startTime, endTime, allDay, url, color, userId, cohorteId } = req.body
    if (allDay) {
      if (!title || !start || !end || !allDay || !color || !cohorteId) {
        res.status(400).send({ message: 'Faltan campos obligatorios', status: 400 })
      }
      try {
        const createEvent = await Calendar.create({
          title: title,
          start: start,
          end: end,
          allDay: allDay,
          url: url,
          color: color,
          userId: userId,
          cohorteId: cohorteId,
        })
        res.status(201).send({ createdEvent: createEvent })
      } catch (err) {
        console.log(err)
        res.status(500).send('Crear evento por dia completo no funciono')
      }
    } else {
      if (!title || !startRecur || !endRecur || !startTime || !endTime || !cohorteId) {
        res.status(400).send({ message: 'Faltan campos obligatorios', status: 400 })
      }
      try {
        const createEvent = await Calendar.create({
          title: title,
          startRecur: startRecur,
          endRecur: endRecur,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
          url: url,
          userId: userId,
          cohorteId: cohorteId
        })
        res.status(201).send(createEvent)
      } catch (err) {
        console.log(err)
        res.status(500).send('Crear evento por horario no funciono')
      }
    }
  },

  async getEvents(req, res) {
    const id = req.params.id
    try {
      const getEvent = await Calendar.findAll({
        where: {
          cohorteId: id
        }
      })
      res.status(201).send(getEvent)
    } catch (err) {
      console.log(err)
      res.status(500).send('Algo salio mal :(')
    }
  },

  async deleteEvent(req, res) {
    const { eventId } = req.body
    try {
      Calendar.findByPk(eventId)
        .then(event => {
          event.destroy()
            .then(() => {
              res.status(200).send(event)
            })
        })
    } catch (err) {
      console.log(err)
      res.status(404).send('Id inexistente')
    }
  },

  async modifyEvent(req, res) {
    const { eventId, title, start, startRecur, end, endRecur, startTime, endTime, allDay } = req.body
    try {
      if (!eventId) {
        return res.status(400).send({ message: "para modificar un evento debes especificar el id" })
      }
      Calendar.findByPk(eventId)
        .then((evento) => {
          evento.title = title || evento.title
          evento.start = start || evento.start
          evento.startRecur = startRecur || evento.startRecur
          evento.end = end || evento.end
          evento.endRecur = endRecur || evento.endRecur
          evento.startTime = startTime || evento.startTime
          evento.endTime = endTime || evento.endTime
          evento.allDay = allDay || evento.allDay
          evento.save()
            .then(() => {
              res.status(204).send(evento)
            })
        })
    } catch (err) {
      console.log(err)
      return res.status(401).send({ message: "No se pudo encontrar el evento que quiere modificar" })
    }
  }
}