import { GET_STUDENTS } from '../consts/actionTypes';

const initialState = {
    
}

export default function students(state = initialState, action){
    switch (action.type) {
        case GET_STUDENTS:
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