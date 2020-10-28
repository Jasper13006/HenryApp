import { NEW_STUDENT_IN_GROUP_PP } from '../consts/actionTypes';



const initialState = {
    
}

export default function newStudent(state = initialState, action){
    switch (action.type) {
        case NEW_STUDENT_IN_GROUP_PP:
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