import { GET_COHORTES, CREATE_COHORT, EDIT_COHORT, ADD_USER_TO_A_COHORT } from '../consts/actionTypes'

const initialState = {

}

export default function cohortes(state = initialState, action){
    switch (action.type) {
        case GET_COHORTES:
            return {
                ...state, 
                data: action.payload
            }
        case CREATE_COHORT: 
        return {
            ...state,
            data: action.payload
        }
        case EDIT_COHORT: 
            return{
                ...state,
                data: action.payload
            }
        // case ADD_USER_TO_A_COHORT:
        //     return {
        //         ...state,
        //         data: action.payload
        //     }
        default:
            return {
                ...state,
            };
    }
}