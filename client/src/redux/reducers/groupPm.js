import { GET_GROUP_PM } from '../consts/actionTypes.js';

const initialState = {}

export default function groupPm(state = initialState, action) {
    switch (action.type) {
        case GET_GROUP_PM:
            return {
                ...state,
                data: action.payload
            }
        default:
            return {
                ...state
            };
    }
}