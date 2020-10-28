import { GET_STUDENT_BY_GROUPP_ID } from '../consts/actionTypes';

const initialState = {
    
}

export default function studentsByPpId(state = initialState, action){
    switch (action.type) {
        case GET_STUDENT_BY_GROUPP_ID:
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