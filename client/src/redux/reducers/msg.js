import {ADD_NEWMSG} from '../consts/actionTypes'

const initialState = {
    msg:[]
}

export default function msg (state = initialState,action){
    switch(action.type){
        case ADD_NEWMSG:
            return{
                ...state,
                msg:state.msg.concat(action.payload)
            }
    }
}