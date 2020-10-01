const server = require("express").Router();
const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

function authenticate (req, res, next) {
  const token = req.header('auth-token')
  if(!token) return res.status(401).json({error: 'Unauthorized'})
  try {
    const verified = jwt.verify(token, SECRET)
    req.user = verified
    next()
  } catch (err) {
    console.log(err)
  }
}

function hashPassword(password) {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return reject(err)
            else {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) return reject(err)
                    return resolve(hash)
                })
            }
        })
    })
}

User.addHook('beforeCreate', (user) => {
    return hashPassword(user.password)
        .then((newPassword) => {
            user.set('password', newPassword)
        })
        .catch((err) => {
            if (err) console.log(err)
        })
})

//Rutar obtener todos los usuarios
server.get("/", (req, res, next) => {
  User.findAll()
    .then((users) => {
      if (users && users.length === 0) {
        return res.send({ message: "No hay usuarios" });
      }
      res.send(users);
    })
    .catch((err) => next(err));
});

//Ruta crear usuario
server.post("/register", async (req, res) => { 
  const {
    email,
    name,
    lastName,
    city,    
    country,
    password,
    admin
  } = req.body;
  if (name && lastName && email && password) {
    const newUser = {
      email,
      name,
      lastName,
      password,
      city,
      country, 
      admin     
    };
    User.create(newUser)
      .then((user) => {
        //mailer.enviar_mail(newUser.name, newUser.email);
        return res.status(201).send(user);
      })
      .catch((error) => console.log(error));
  } else {
    return res.status(400).send({ message: "Faltan campos obligatorios", status: 400 });
  }
});

// ruta login
server.post("/login", async (req, res) => {
    const {
      email,
      password
    } = req.body;
  try {
    const user = await User.findOne({where: {email:email}})
    if (!user){
        return res.status(400).send({ message: "Cuenta inexistente, registrese", status: 400 })
    }else{
        const validate = bcrypt.compare(password, user.password)
        if(!validate) return res.status(400).json({ message: 'Credenciales inválidas' })
        const token = jwt.sign({id: user.id}, SECRET)
        res.header('auth-token', token)
        res.status(200).send({token: token, user})
    }
  }catch (error) { console.log(error)}
})

// busca usuario por id
server.get('/:id', authenticate, async (req, res) => {
  try{ 
      const user = await User.findByPk(req.params.id)
      res.status(200).send(user)
  }
  catch (error) { 
      console.log(error);
      res.status(400).send({ message: 'Usuario no encontrado' })}    
})

//promover o quitar de admin, pm o instructor, active (bloquear y desbloquear usuario)
server.put('/promote/:id', authenticate, async (req, res) => {
    const admin = req.user;
    const user = await User.findByPk(admin.id)
    if(user.admin){    
        const { role, estado}  = req.body; // por body "role":"admin" , "estado": true // por ejemplo 
        User.findByPk(req.params.id)
            .then((user) => {
                if (!user) return res.status(404).send('Id no válido')
                user[role] = estado;
                return user.save()
            })
            .then((user) => res.send(user))
            .catch((err) => res.status(500).send(err))
    }else{
      res.status(403).send({ message: 'Usuario no autorizado' })
    }
})

//modificar datos usuario
server.put('/profile/:id', authenticate, async (req, res) => {      
    const { city, country, image, googleId, gitHubId}  = req.body;  
    const user = await User.findByPk(req.params.id)
    if (!user) return res.status(404).send('Usuario inexistente para ese id')
    user.city = city || user.city;
    user.country = country || user.country;
    user.image = image || user.image;
    user.googleId = googleId || user.googleId;
    user.gitHubId = gitHubId || user.gitHubId;
    await user.save()    
    res.status(200).send(user)    
})







module.exports = server;