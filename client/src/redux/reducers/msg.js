import {ADD_NEWMSG,GET_CHATS,GET_MSG,DELETE_MSGS} from '../consts/actionTypes'

const initialState = {
    mensajes:[],
    chats:[]
}

const filterOrDelete = (data,chats) => {
    for (let index = 0; index < chats.length; index++) {
        if(chats[index].to.id === data.to.id || chats[index].from.id === data.to.id){
            return chats
        }
        
    }
    let chat = {
        id:data.chatBack.id,
        from:data.from,
        to:data.to,
        check:data.chatBack.check
    }
    
    return chats.concat(chat)

}
export default function msg (state = initialState,action){
    switch(action.type){
        case ADD_NEWMSG:
            return{
                ...state,
                mensajes:state.mensajes.concat(action.payload),
                chats:filterOrDelete(action.payload,state.chats)
            };
        case GET_CHATS:
            return{
                ...state,
                chats:action.payload
            };
        case GET_MSG:
            return{
                ...state,
                mensajes:action.payload
            };
        case DELETE_MSGS:
            return{
                ...state,
                mensajes:[]
            }
        default:
            return {
                ...state,
            }

    }
}
