const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary')

const SECRET = process.env.SECRET;



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

    const { email, name, lastName, city, country, password, admin } = req.body;
    if (!name || !lastName || !email || !password) {
      return res.status(400).send({ message: "Faltan campos obligatorios", status: 400 });
    }

    try {
      if (req.files) {
        const file = req.files.photo;
        image = await uploadImage(file)
      }
      const user = await User.findOne({ where: { email: email } })
      if (user) {
        return res.status(400).send({ message: "Ya existe un usuario con ese email", status: 400 });
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
      const validate = await bcrypt.compare(password, user.password )
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
    const { city, country, googleId, gitHubId } = req.body;
    if (req.files) {
      const file = req.files.photo;
      image = await uploadImage(file)
    }
    const user = await User.findByPk(req.params.id)

    if (!user) return res.status(404).send('Usuario inexistente para ese id')
    user.city = city || user.city;
    user.country = country || user.country;
    user.image = image || user.image;
    user.googleId = googleId || user.googleId;
    user.gitHubId = gitHubId || user.gitHubId;
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
  }









}
