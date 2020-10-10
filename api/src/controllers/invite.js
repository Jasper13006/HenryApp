const {User} = require('../db.js');
const nodemailer = require('nodemailer');
const ejs = require("ejs");
const jwt = require("jsonwebtoken");
const Secret = process.env.SECRET




module.exports = {
  
   //////////////////////
  //// enviar invitaciones
  /////////////////////  
  
    async sendInvite(req, res)  {
        const {name,email} = req.body
        if(!/\S+@\S+\.\S+/.test(email)){
            return res.send({msg:'email invalido',status:400})
        }
        const user = await User.findOne({
            where:{
                email
            }
        })
        const token = await jwt.sign({email:email},Secret)
        const url = `http://localhost:3000/register/${token}`
        if(user){
            return res.send({ msg: "Usuario ya es un alumno",status:400});
        }
        try{
            var smtpTransport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                auth: {
                    user: 'ecomerce0410@gmail.com',
                    pass: "henry1234."
                }
            });


            smtpTransport.verify((error, success) => {
                if (error) {
                    return res.status(400).send({ message: "No hay conexion" });
                }                     
                console.log('Server is ready to take messages');
            });
            ejs.renderFile(__dirname + '/NewUser.ejs', { name: name,url:url}, function (err, data) {
                if (err) {
                    return res.status(400).send({ message: "No se renderizo el msj" });
                } 
                var mainOptions = {
                    to: email,
                    from: 'ecomerce0410@gmail.com',
                    subject: `Hola ${name}`,
                    html: data,
                };
                smtpTransport.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        res.json({
                            message: 'fail'
                        })
                    } else {
                        res.json({
                            message: 'success'
                        })
                    }
                });
                
            })
        }catch(err) {
            console.log(err)
            return res.status(400).send({ message: err });
        }        
   
    }  


}