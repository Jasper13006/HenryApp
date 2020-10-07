import axios from 'axios'
import { GET_USER, GET_INSTRUCTORS, GET_USERS } from '../consts/actionTypes'



export function traerUsuario(data){
    return function(dispatch){
        return dispatch({
            type: GET_USER,
            payload: data
        })
    }
}

export function getInstructors(){
    return function(dispatch){
        const token = localStorage.getItem("token")
        return axios({
            method: "GET",
            url: "http://localhost:3001/user/instructor",
            credentials: "include",
            headers: {"auth-token": token}
        })
        .then(response => {
            dispatch({
                type: GET_INSTRUCTORS,
                payload: response.data 
            })
        })
        .catch(error => {
            alert(error.message)
        })
    }
}

export function traerUsuarios(){
    return function(dispatch){
        const token = localStorage.getItem("token")
        return axios({
            method: "GET",
            url: "http://localhost:3001/user",
            credentials: "include",
            headers: {"auth-token": token}
        })
        .then(response => {
            dispatch({
                type: GET_USERS,
                payload: response.data
            })
        })
        .catch(error => {
            alert(error.message)
        })
    }
}