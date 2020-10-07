const { User } = require("../db.js");

module.exports = {
    async createAdmin(req, res) {
        const { name, lastName, email, password, admin } = req.body
        const userAdmin = await User.findOne({
          where: {
            email: email
          }
        })
      
        if (userAdmin) {
          return res.status(400).send('Admin ya creado')
        }
        try {
          const newAdmin = await User.create({
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            admin: admin || false
          })
          res.status(201).send(newAdmin)
        } catch (err) {
          console.log(err)
          res.status(500).send('algo salio mal')
        }
      
      }
}