import { GET_MODULOS } from '../consts/actionTypes'

const initialState = {

}

export default function Modulos(state = initialState, action){
    switch (action.type) {
        case GET_MODULOS:
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