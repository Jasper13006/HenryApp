const server = require("express").Router();
const {createPpGroup,getGroupPp, groupPPbyPmId, groupsPPbyPmId } = require('../controllers/pP')
const authenticate = require('../utils/auth');

//Ruta crear grupo pp
server.post('/create',authenticate, createPpGroup)

//Ruta para traer grupo Pp 
//Ruta trae un grupo de pp en un objeto con una propiedad "gpp" = detalles de grupo
// "students" = informacion de todos los estudiantes

server.get('/:id', authenticate,getGroupPp)


server.get("/group/:cohorteId/:grouppmId", authenticate, groupPPbyPmId)

server.get("/groups/:grouppmId", authenticate, groupsPPbyPmId)



module.exports = server;