import axios from 'axios'
import {ADD_NEWMSG} from '../consts/actionTypes'

export function addNewMsg(data){
    return function(dispatch){
        return dispatch({
            type: ADD_NEWMSG,
            payload: data
        })
    }
}