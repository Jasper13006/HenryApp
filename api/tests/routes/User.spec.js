const request = require('supertest')
const { expect } = require('chai');
const { conn } = require('../../src/db.js');
const app = require('../../src/app');

  const user = [
    {
      name:'jhoan',
      lastName:'lugo',
      email:'jslugo23@hotmail.com',
      password:'herny1234',
      admin:true
    },
    
    {
      name:'pablo',
      lastName:'lugo',
      email:'pablo234@hotmail.com',
      password:'herny1234',
    },
    
    {
      name:'carlos',
      lastName:'lugo',
      email:'carlos2345@hotmail.com',
      password:'herny1234',
    }

  ] 
  var token;
  describe('Ruta User', () => {
    
    describe('Crear usuario', () => {
      beforeEach('Sincroniza y limpia tu base de datos', () => conn.sync({force: true}));
      it('deberia crear un nuevo usuario', async () => {    
        const res = await request(app)
          .post('/user/register')
          .send(user[0])
        expect(res.statusCode).to.be.equal(201)
        expect(res.body).to.have.property('email')
      })
    })

    describe('validar email', () => {
      it('no deberia crear un usuario con el mismo email', async () => {    
        const res = await request(app)
          .post('/user/register')
          .send(user[0])
        expect(res.statusCode).to.be.equal(400)
        expect(res.body.message).to.be.equal('Ya existe un usuario con ese email')
      })
    })

    describe('traer todos los usuarios', () => {
      it('deberia traer un array de usuarios', async () => {  
        for (let index = 1; index < user.length; index++) {
          let res = await request(app)
          .post('/user/register')
          .send(user[index])      
        }  
        let res = await request(app)
          .get('/user')   
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.have.lengthOf(3);
      })
    })

    describe('Loguearse correctamente', () => {
      it('deberia traer un token de seguridad', async () => {  
        
        const res = await request(app)
        .post('/user/login')
        .send({
          email:"jslugo23@hotmail.com",
          password:"herny1234"
        })  
        token = res.body.token   
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.have.property('token')
        expect(res.body).to.have.property('user')
      })
    })

    describe('Error por email', () => {
      it('deberia no poder loguearse si ingresa un email invalido', async () => {  
        
        const res = await request(app)
        .post('/user/login')
        .send({
          email:"j@hotmail.com",
          password:"herny1234"
        })     
        expect(res.statusCode).to.be.equal(400)
        expect(res.body.message).to.be.equal('Cuenta inexistente, registrese')
      })
    })

    describe('Error por contraseña', () => {
      it('deberia no poder loguearse si ingresa una contraseña invalida', async () => {  
        
        const res = await request(app)
        .post('/user/login')
        .send({
          email:"jslugo23@hotmail.com",
          password:"1234"
        })     
        expect(res.statusCode).to.be.equal(400)
        expect(res.body.message).to.be.equal('Credenciales inválidas')
      })
    })
/* 
    describe('Promover', () => {
      it('deberia promover de instructor el usuario', async () => {                   
        const res = await request(app)
        .put('user/promote/2')   
        .send({role:"instructor",estado:true})         
        expect(res.statusCode).to.be.equal(200)
        expect(res.body.instructor).to.be.equal(true)
        done() 
        .catch(err => console.log(err))      
        
      })
    }) */

    describe('Traer los instructores', () => {
      it('deberia traer un array con todos los instructores', async () => {  
        
        const res = await request(app)
        .get('/user/instructor')   
        expect(res.statusCode).to.be.equal(200)
        expect(res.body[0].name).to.be.equal('pablo')
      })
    })

})

