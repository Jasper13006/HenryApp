const { User, Feedback, Privacy } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary');
const nodemailer = require('nodemailer');


const SECRET = process.env.SECRET;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
      user: 'ecomerce0410@gmail.com',
      pass: "henry1234."
  }
});

// const transporter = nodemailer.createTransport({
// 	service: 'gmail',
// 	host: 'smtp.gmail.com',
// 	port: 465,
// 	secure: true,
// 	auth: {
// 	  type: 'OAuth2',
// 	  user: process.env.user,
// 	  clientId: process.env.clientId,
// 	  clientSecret: process.env.clientSecret,
// 	  refreshToken: process.env.refreshToken,
// 	  accessToken: process.env.accessToken
// 	}
//   })

const uploadImage = (file) => new Promise((resolve, reject) => {

  cloudinary.config({
    cloud_name: 'dxnd3uqlx',
    api_key: '151315768991554',
    api_secret: 'wonkrqTdVInQ8yTjb_-yJpRYxjE'
  })

  cloudinary.uploader.upload(file.tempFilePath, function (result, err) {
    if (err) { return reject(err) }
    return resolve(result.url)
  })

})

const hashPassword = (password) => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return reject(err)
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return reject(err)
      return resolve(hash)
    })
  })
})

User.addHook('beforeCreate', (user) => hashPassword(user.password)
  .then((newPassword) => {
    user.set('password', newPassword)
  })
  .catch((err) => {
    if (err) console.log(err)
  }))


module.exports = {

  async getUsers(req, res) {
    try {
      const users = await User.findAll()
      if (users && users.length === 0) {
        return res.status(404).send({ message: "No hay usuarios" });
      }
      res.status(200).send(users);
    } catch (error) {
      console.log(error)
    }
  },

  async getOneUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id)
      res.status(200).send(user)
    }
    catch (error) {
      console.log(error);
      res.status(400).send({ message: 'Usuario no encontrado' })
    }
  },

  async registerUser(req, res) {

    let image = 'https://www.ibm.com/blogs/systems/mx-es/wp-content/themes/ibmDigitalDesign/assets/img/anonymous.jpg'
    const {token} = req.params
    const {email} = await jwt.verify(token,SECRET)
    const {  name, lastName, city, country, password, admin } = req.body;
    if (!name || !lastName || !email || !password) {
      return res.status(400).send({ message: "Faltan campos obligatorios"});
    }

    try {
      if (req.files) {
        const file = req.files.photo;
        image = await uploadImage(file)
      }
      const user = await User.findOne({ where: { email: email } })
      if (user) {
        return res.send({ message: "Ya existe un usuario con ese email", status: 400 });
      }
      const userData = { email, name, lastName, password, city, country, admin, image };
      const newUser = await User.create(userData)
      return res.status(201).send(newUser)
    } catch (err) {
      console.log('err', err)
      return res.status(500).send(err)
    }

  },

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {

      const user = await User.findOne({ where: { email: email } })
      if (!user) {
        return res.status(400).send({ message: "Cuenta inexistente, registrese", status: 400 })
      }
      const validate = await bcrypt.compare(password, user.password)
      if (!validate) return res.status(400).json({ message: 'Credenciales inválidas' })
      const token = jwt.sign({ id: user.id }, SECRET)
      res.header('auth-token', token)
      res.status(200).send({ token: token, user })
    } catch (error) { console.log(error) }
  },

  async promoteUser(req, res) {
    const admin = req.user;
    const user = await User.findByPk(admin.id)
    if (user && user.admin) {
      const { role, estado } = req.body; // por body "role":"admin" , "estado": true // por ejemplo 
      User.findByPk(req.params.id)
        .then((user) => {
          if (!user) return res.status(404).send('Id no válido')
          user[role] = estado;
          return user.save()
        })
        .then((user) => res.send(user))
        .catch((err) => res.status(500).send(err))
    } else {
      res.status(403).send({ message: 'Usuario no autorizado' })
    }
  },

  async userEditProfile(req, res) {
    const { city, country, googleId, gitHubId, password, newPassword } = req.body;
    if (req.files) {
      const file = req.files.photo;
      image = await uploadImage(file)
    }

    const user = await User.findByPk(req.params.id)
    if (!user) return res.status(404).send('Usuario inexistente para ese id')
    let changedPassword=""
    if(password && newPassword){
      const validate = await bcrypt.compare(password, user.password)
      if(!validate){
        return res.send({status:401,msg:'Contraseña incorrecta'})
      }
      changedPassword = await hashPassword(newPassword)
    }
    user.city = city || user.city;
    user.country = country || user.country;
    if (req.files) {user.image = image || user.image};
    user.googleId = googleId || user.googleId;
    user.gitHubId = gitHubId || user.gitHubId;
    user.password = changedPassword || user.password
    await user.save()
    res.status(200).send(user)
  },

  async getInstructors(req, res) {
    try {
      const instructors = await User.findAll({
        where: {
          instructor: true,
        }
      })
      res.status(200).send(instructors)
    } catch (error) {
      console.log(error)
    }
  },

  async getPms(req, res) {
    try {
      const pms = await User.findAll({
        where: {
          pm: true,
        }
      })
      res.status(200).send(pms)
    } catch (error) {
      console.log(error)
    }
  },
  
  async mailResetPassword (req, res) {
    const { email } = req.body	
    const usuario = await User.findOne({
      where: {
        email: email
      }
    })   
    if (usuario) {      
      const emailToken = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: '1d' })
      usuario.passwordToken = emailToken || usuario.passwordToken
      usuario.save()
      const url = `http://localhost:3000/user/resetpassword/${emailToken}`
      const mailOptions = {
        from: process.env.user,
        to: email,
        subject: 'Restablece tu contraseña! HenryApp',
        html: `<img margin="auto" src="https://res.cloudinary.com/dxnd3uqlx/image/upload/v1601847591/HENRY_APP_j5g2mb.png"/>
               <hr/>
               <p>Clickea en el link para cambiar tu contraseña</p> 
               <p>Link:</p>
               <hr/>
               <a href='${url}'>${url}</a>        
               <hr/>
               <p>Este link expira en un dia y solo es válido una vez..!</p>` 
      }
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.log(err)
          res.status(400).send({message: 'mail no enviado'})
        } else {
          console.log('email sent')
          res.status(200).send('email enviado!')
        }
      })
    } else {
      res.status(400).send({ message: 'usuario no existe', status: 400 })
    }	
  },

  async calificarCompaneros(req, res) {
    const { body: { toId, fromId, qualification, description, position } } = req

    if (!toId  || !fromId || !qualification) return res.status(400).send({ message: 'Este campo es necesario..!', status: 400 })

    const feedbackData = { toId, fromId, qualification, description, position }
    try {
      const feedback = await Feedback.findOne({
        where: {
          toId: toId,
          fromId: fromId
        }
      })
      if (feedback) {
        const feedDate = feedback.createdAt
        const currentDate = new Date()
        // checheamos si ha pasado una semana desde el ultimo feedback para esos usuarios 
        if ((currentDate - feedDate) < 604800000) {
          console.log('ya hiciste un review a este companero esta semana..!')
          return res.status(400).send({ message: 'ya hiciste un review a este companero esta semana..!' })
        } else {
          console.log('puedes hacer un review a este companero..!')

          const newFeedback = await Feedback.create(feedbackData)
          return res.status(201).send(newFeedback)
        }
      }

      const newFeedback = await Feedback.create(feedbackData)
      return res.status(201).send(newFeedback)
    } catch (err) {
      console.log(err)
      res.send(500).send(err)
    }
  },

  async getUserFeedback(req, res) {
    const { params: { id } } = req
    try {
      const user = await User.findOne({
        where: {
          id: id
        }
      })
      if(!user) return res.status(404).send({ message: 'el usuario no existe..!'})

      const userfeedback = await Feedback.findAll({
        where: {
          toId: id
        }
      })
      if(!userfeedback) return res.status(400).send({ message: 'este usuario no tiene comentarios'})

      res.status(200).send(userfeedback)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  },

   
  async getUserByMail (req, res) {

    try {
      const usuario = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (usuario) {
        res.status(200).send({ msg: 'este es tu usuario', status: 200, usuario })
      } else {
        res.send({ msg: 'usuario no existe', status: 400 })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  },
     
  async forgotPassword(req, res){
    try {
      // get user id from the token..!
      const { id } = jwt.verify(req.params.token, SECRET)
      if(!id) {
        return res.status(400).send({message: 'Token expirado, recuerde contraseña nuevamente..!', status: 401})
      }
      // find the user with that id
      let user = await User.findByPk(id)
      if (!user.passwordToken){
        return res.status(400).send({message:'Token no válido'})
      }
      // hash the password 
      let newPassword = await hashPassword(req.body.password)
  
      // update the user with the new password
      await user.update({ password: newPassword, passwordToken: null}) // falta destruir el token
  
      // send the response
      res.send({message: 'contraseña cambiada exitosamente', user, status: 200})
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }

}
