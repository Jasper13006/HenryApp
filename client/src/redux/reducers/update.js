import { UPDATE } from '../consts/actionTypes'

const initialState = 0

export default function update(state= initialState, action){
    switch (action.type) {
        case UPDATE:
            return state + 1
        default:
            return state
    }
}