import { ThemeProvider } from '@material-ui/core'
import {ADD_NEWMSG,GET_CHATS,GET_MSG,DELETE_MSGS, EDIT_CHAT,EDIT_VALIDATE,ADD_MSGSOCKET,ADD_CHATNOT, ADD_CHATSOCKET,REMOVE_CHATNOT} from '../consts/actionTypes'

const initialState = {
    mensajes:[],
    chats:[],
    chatsNotification:[],
    validate:true
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
        case ADD_MSGSOCKET:
            return{
                ...state,
                mensajes:state.mensajes.concat(action.payload),
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
            
        case EDIT_CHAT:
            return {
                ...state,
                chats:state.chats.map((chat)=> {
                    if(chat.id === action.payload){                         
                        return {
                            ...chat,
                            ['check']:true,
                            ['from']:chat.to,
                            ['to']:chat.from
                        }           
                    } else{
                        return chat
                    }                    
                }),
                validate:!state.validate
                
            };
        case DELETE_MSGS:
            return{
                ...state,
                mensajes:[]
            };
        case EDIT_VALIDATE:
            return {
                ...state,
                validate:!state.validate
            };
        case ADD_CHATNOT:
            return {
                ...state,
                chatsNotification:state.chatsNotification.concat(action.payload)
            };
        case ADD_CHATSOCKET:
            return{
                ...state,
                chats:state.chats.concat(action.payload)
            };
        case REMOVE_CHATNOT:
            return{
                ...state,
                chatsNotification:state.chatsNotification.filter(chat => chat.id !== action.payload.id)
            }
        default:
            return {
                ...state,
                
            }

    }
}
