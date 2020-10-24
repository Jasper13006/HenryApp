import { GET_STUDENTS_BY_GROUP } from '../consts/actionTypes.js';

const initialState = []

export default function studentByGroupPM(state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS_BY_GROUP:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }



}