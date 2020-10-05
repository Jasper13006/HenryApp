// import axios from 'axios'
import { SET_ACTIVE_OPTION_PANEL } from '../consts/actionTypes'
import axios from 'axios';



export function setActiveOptionPanel(data){
    return function(dispatch){
        return dispatch({
            type: SET_ACTIVE_OPTION_PANEL,
            payload: data
        })
    }
}