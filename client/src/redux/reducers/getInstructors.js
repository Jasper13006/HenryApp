import { GET_INSTRUCTORS } from '../consts/actionTypes'

const initialState = {

}

export default function instructores(state = initialState, action){
    switch (action.type) {
        case GET_INSTRUCTORS:
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