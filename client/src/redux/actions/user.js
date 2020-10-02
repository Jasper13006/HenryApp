import axios from 'axios'
import { GET_USER } from '../consts/actionTypes'



export function traerUsuario(data){
    return function(dispatch){
        return dispatch({
            type: GET_USER,
            payload: data
        })
    }
}