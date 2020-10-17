import {ADD_NEWMSG,GET_CHATS} from '../consts/actionTypes'

const initialState = {
    mensajes:[],
    chats:[]
}

export default function msg (state = initialState,action){
    switch(action.type){
        case ADD_NEWMSG:
            return{
                ...state,
                mensajes:state.mensajes.concat(action.payload)
            };
        case GET_CHATS:
            return{
                ...state,
                chats:action.payload
            }
        default:
            return {
                ...state,
            }

    }
}
