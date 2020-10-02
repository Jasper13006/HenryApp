const server = require("express").Router();
const authenticate = require('../utils/auth');
const { createCohorte, getCohortes, addStudent, getCohortesId} = require('../controllers/cohorte')
const { getGroupPm, editGroupPm, editStudent, createPmGroup } = require('../controllers/pm')
const isAdmin = require('../utils/isAdmin')

//Ruta obtener todos los cohortes
server.get("/", getCohortes);

server.get('/:id', getCohortesId)

//Ruta crear cohorte
server.post("/create", authenticate, createCohorte);

//Ruta agregar estudiantes a un cohorte
server.post('/addStudent/:id',authenticate,isAdmin,addStudent)


//Ruta crear grupo con pms 
server.post('/group-pm/create',authenticate, createPmGroup)

// Ruta agregar a grupo pms y pps
server.put('/addStudent/:id',editStudent)

//Ruta trae un grupo de pms en un objeto con una propiedad "gpm" = detalles de pms y grupo
// "students" = informacion de todos los estudiantes

server.get('/group-pm/:id', authenticate, isAdmin, getGroupPm)

server.put('/group-pm/edit/:id',editGroupPm)

module.exports = server;