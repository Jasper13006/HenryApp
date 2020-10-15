const {Msg,User} = require('../db')


module.exports = {
    async CreateMsg(req,res)  {
        const {fromId, description} = req.body;
        const toId = req.user.id;
        if(!description){
            return res.send({msg:'agrega un mensaje',status:400})
        }
        try{
            const NewMsg = Msg.Create({
                toId,
                fromId,
                description
            })
            return res.send(200).json(NewMsg)
        }
        catch(err){
            return res.send(400).json(err)
        }
    },
}