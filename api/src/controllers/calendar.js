const { Calendar } = require("../db.js");

module.exports = {
    async createCalendar(req, res) {
        const { title, start, end, allDay, cohorteId } = req.body
        if (!title || !start || !end || !allDay || !cohorteId) {
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
          res.status(201).send(createEvent)
        } catch (err) {
          console.log(err)
          res.status(500).send('Algo salio mal')
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
    }
}