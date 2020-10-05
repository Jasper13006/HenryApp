import { GET_STUDENTS_BY_COHORTE_ID } from '../consts/actionTypes'

const initialState = {

}
export default function getAlumnosCohorte(state = initialState, action){
    switch (action.type) {
        case GET_STUDENTS_BY_COHORTE_ID:
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