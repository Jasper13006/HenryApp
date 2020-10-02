import { USER_LOGIN } from '../consts/actionTypes.js';

const initialState = {}

export default function createUser(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }

}