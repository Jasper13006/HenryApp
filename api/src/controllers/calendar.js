const { Calendar } = require("../db.js");

module.exports = {
    async createCalendar(req, res) {
        const { title, start, startRecur, end, endRecur, startTime, endTime, allDay, cohorteId } = req.body
        if (allDay){
          if ( !title || !start || !end || !allDay || !cohorteId) {
              res.status(400).send({message: 'Faltan campos obligatorios', status: 400})
          }
          try {
            const createEvent = await Calendar.create({
              title: title,
              start:  start,
              end: end,
              allDay: allDay,
              cohorteId: cohorteId,
            })
            res.status(201).send({createdEvent: createEvent})
          } catch (err) {
            console.log(err)
            res.status(500).send('Crear evento por dia completo no funciono')
          }
        } else {
          if ( !title || !startRecur || !endRecur || !startTime || !endTime || !cohorteId) {
            res.status(400).send({message: 'Faltan campos obligatorios', status: 400})
        }
        try {
          const createEvent = await Calendar.create({
            title: title,
            startRecur: startRecur,
            endRecur: endRecur,
            startTime: startTime,
            endTime: endTime,
            allDay: false,
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
    }
}