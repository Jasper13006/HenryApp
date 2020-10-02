import { SET_ACTIVE_OPTION_PANEL } from '../consts/actionTypes'

const initialState = {

}

export default function usuario(state= initialState, action){
    switch (action.type) {
        case SET_ACTIVE_OPTION_PANEL:
                return {
                    ...state,
                    data: action.payload
                }
        default:
            return{
                ...state
            };
    }
}