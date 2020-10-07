import { GET_COHORTES } from '../consts/actionTypes'

const initialState = {

}

export default function cohortes(state = initialState, action){
    switch (action.type) {
        case GET_COHORTES:
            return {
                ...state, 
                data: action.payload
            }
    
        default:
            return {
                ...state,
            };
    }
}