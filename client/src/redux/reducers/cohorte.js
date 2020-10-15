import { GET_MY_COHORTE, GET_COHORTES } from '../consts/actionTypes'

const initialState = {

}

export default function getCohorteUser(state = initialState, action) {
    switch (action.type) {
        case GET_MY_COHORTE:
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