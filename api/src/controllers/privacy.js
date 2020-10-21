const { Privacy, User } = require("../db.js");

module.exports = {
  async setPrivacy(req, res) {
    const { emailP, onLineStatus,gitHub,linkedIn, userId } = req.body
    if (!userId) {
        return res.status(400).send({ message: 'No se ha identificado el usuario', status: 400 })
    }
    let current = await Privacy.findOne({
      where:{
        userId: userId
      }
    })
    if(current){
      console.log(current)
      return res.status(204).send(current)
    }
    try {
        const privacyStatus = await Privacy.create({
          emailP: emailP,
          onLineStatus: onLineStatus,
          gitHub: gitHub,
          linkedIn:linkedIn,
          userId: userId,
        })
        res.status(201).send({ privacy: privacyStatus })
      } 
    catch (err) {
        console.log(err)
        res.status(500).send('No se pudo establecer la privacidad')
      }
    },

    async getPrivacy(req, res) {
        const { userId } = req.body
        if (!userId) {
            res.status(400).send({ message: 'Faltan campos obligatorios', status: 400 })
        }
        try {
            const userPrivacy = await Privacy.findOne({
              where:{
                  userId: userId
              },
              include: User
            })
            res.status(201).send({ userPrivacy: userPrivacy })
          } 
        catch (err) {
            console.log(err)
            res.status(500).send('No se pudo encontrar la información')
          }
        },

    async changePrivacy(req, res) {
        const { userId, emailP, onLineStatus, gitHub, linkedIn} = req.body
        if (!userId) {
            res.status(400).send({ message: 'Faltan campos obligatorios', status: 400 })
        }
        try {
            const userPrivacy = await Privacy.findOne({
              where:{
                  userId: userId
              }
            })
            userPrivacy.emailP = emailP || userPrivacy.emailP
            userPrivacy.onLineStatus = onLineStatus || userPrivacy.onLineStatus
            userPrivacy.gitHub = gitHub || userPrivacy.gitHub
            userPrivacy.linkedIn = linkedIn || userPrivacy.linkedIn
            userPrivacy.save()
            .then(res.status(204).send({ userPrivacy: userPrivacy }))
            
          } 
        catch (err) {
            console.log(err)
            res.status(500).send('No se pudo actualizar la información')
          }
        },

        async getAllPrivacy(req, res) {
          try {
              const usersPrivacy = await Privacy.findAll({include:User})
              res.status(201).send({ usersPrivacy: usersPrivacy })
            } 
          catch (err) {
              console.log(err)
              res.status(500).send('No se pudo encontrar la información')
            }
          },
}

