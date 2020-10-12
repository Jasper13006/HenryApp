import { UPDATE } from '../consts/actionTypes'

export function update(){
    return async function(dispatch){
        return await dispatch({
            type: UPDATE
        })
    }
}