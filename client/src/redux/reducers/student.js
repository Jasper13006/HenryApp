import { STUDENT_BY_USER_ID } from '../consts/actionTypes';

const initialState = {
    
}

export default function students(state = initialState, action){
    switch (action.type) {

        case STUDENT_BY_USER_ID: 
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