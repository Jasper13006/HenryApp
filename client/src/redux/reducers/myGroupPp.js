import { GET_MY_GROUP_PP } from '../consts/actionTypes';


const initialState = {
    
}

export default function myGroupPp(state = initialState, action){
    switch (action.type) {
        case GET_MY_GROUP_PP:
            return {
                ...state,
                data: action.payload
            }
    
        default:
            return {
                ...state
            }
    }
}