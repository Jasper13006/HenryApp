const {Msg,User,Chat} = require('../db.js')
const { Op } = require("sequelize");



module.exports = {
    async CreateMsg(req,res)  {
        const {toId, description} = req.body;
        const fromId = req.user.id;
        if(!description ){
            return res.send({msg:'agrega un mensaje',status:400})
        }
        try{
            const chat = await Chat.findOne({                
                where:{
                    fromId: {
                        [Op.or]: [toId, fromId]
                    },
                    toId:{
                        [Op.or]: [toId, fromId]
                    }
                    
                }   
            })
            console.log(chat)
            if(chat){
                chat.fromId = fromId;
                chat.toId = toId;
                chat.check = false;
                await chat.save() 
                let newMsg = await Msg.create({
                    description,
                    chatId:chat.id,
                    fromId,
                    toId
                })
                return res.status(200).send(chat)
            } 
            
            const newChat = await Chat.create({
                toId,
                fromId,
                check:false,
            }) 
            let newMsg = await Msg.create({
                description,
                chatId:newChat.id,
                fromId,
                toId
            })           
            return res.status(200).send(newChat)
        }
        catch(err){
            return res.status(401).send(err)
        }
    },

    async getChat(req,res) {
        const id = req.user.id
        try{
            
            const allMsg = await Chat.findAll({
                where: { 
                    [Op.or]: [
                        { fromId: id },
                        { toId: id }
                    ]                    
                   
                },                
                order:[['updatedAt','DESC']],
                include: [
                    { model: User, as: 'to' ,attributes:['id','fullName','image','name','lastName'] },
                    { model: User, as: 'from',attributes:['id','fullName','image','name','lastName']  },
                            
                ],
                attributes:['id','updatedAt','check'],
                limit:10
                
              
            });            
            return res.send(allMsg)
        }catch(err){
            return res.status(400).send(err)
        }
    },

    async getMsg (req,res) {
        const {chatId} = req.params
        const chat = await Chat.findOne({
            where:{id:chatId}
        })
        if(!chat){
            return res.send({msg:'no existe el chat',status:400})
        }
        try{
            const allMsg = await Msg.findAll({
                where:{chatId},
                order:[['updatedAt','ASC']],
                include: [
                    { model: Chat, as: 'chat',attributes:['id','updatedAt','check']},                    
                    {model:User,as: 'to',attributes:['id','fullName','image','name','lastName'] },
                    {model:User,as:'from',attributes:['id','fullName','image','name','lastName'] },
                ],
                attributes:['id','updatedAt','description'],
            })
            return res.status(200).send(allMsg)
        }catch(err){
            return res.status(400).send(err)
        }
    },

    async editChat (req,res) {
        const fromId = req.user.id;
        const {chatId} = req.params;
        try{ 
            const chat = await Chat.findOne({
                where:{id:chatId}
            })           
            chat.fromId=chat.fromId;
            chat.toId = fromId;
            chat.check = true;
            chat.save();       
            return res.send(chat)

        }catch(err){
            res.status(400).send(err)
        }
    }
}