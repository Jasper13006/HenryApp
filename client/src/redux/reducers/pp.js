import { GET_GROUPS_PP } from '../consts/actionTypes';

const initialState = {
    
}

export default function gruposPPByPmId(state = initialState, action){
    switch (action.type) {
        case GET_GROUPS_PP:
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