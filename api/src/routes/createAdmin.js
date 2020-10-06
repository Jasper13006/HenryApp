const server = require('express').Router()
const { User } = require('../db.js')

server.get("/", async (req, res) => {
  const userAdmin = await User.findOne({
    where: {
      email: "admin1@admin1.com"
    }
  })

  if (userAdmin) {
    return res.status(400).send('Admin ya creado')
  }
  try {
    const newAdmin = await User.create({
      name: "Admin",
      lastName: "Admin",
      email: "admin@admin.com",
      password: "Henry1234",
      admin: true
    })
    res.status(201).send(newAdmin)
  } catch (err) {
    console.log(err)
    res.status(500).send('algo salio mal')
  }
    
})

module.exports = server