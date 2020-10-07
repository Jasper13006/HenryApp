import { GET_USERS } from '../consts/actionTypes';

const initialState = {

}

export default function users(state = initialState, action){
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                data: action.payload
            }
    
        default:
            return {
                ...state,
            }
    }
}