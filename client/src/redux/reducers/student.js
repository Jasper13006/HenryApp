
import { GET_STUDENTS_BY_GROUP, ADD_STUDENT_TO_GROUP, STUDENT_BY_USER_ID } from '../consts/actionTypes.js';

const initialState = []

export default function student(state = initialState, action) {
    switch (action.type) {
        case ADD_STUDENT_TO_GROUP:
            return {
                ...state,
                data: action.payload
            }

        case STUDENT_BY_USER_ID:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }



}