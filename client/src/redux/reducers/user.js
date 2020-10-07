import { SET_USER } from '../consts/actionTypes'

const initialState = {}

export default function usuario(state= initialState, action){
    switch (action.type) {
        case SET_USER:
                return {
                    ...state,
                    data: action.payload
                }
        default:
            return{
                ...state
            };
    }
}