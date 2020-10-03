const {User} = require('../db.js');
const nodemailer = require('nodemailer');
const ejs = require("ejs");



module.exports = {
  
   //////////////////////
  //// enviar invitaciones
  /////////////////////  
  
    async sendInvite(req, res)  {
        const {name,email} = req.body
        const user = await User.findOne({
            where:{
                email
            }
        })
        if(user){
            return res.status(400).send({ message: "Usuario ya es un alumno" });
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
            ejs.renderFile(__dirname + "/NewUser.ejs", { name: name }, function (err, data) {
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
                            msg: 'fail'
                        })
                    } else {
                        res.json({
                            msg: 'success'
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