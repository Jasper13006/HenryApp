import axios from 'axios'
import { GET_USER, GET_INSTRUCTORS, GET_USERS } from '../consts/actionTypes'
import { SET_USER } from '../consts/actionTypes'




export function setUser(data){
    return function(dispatch){
        return axios({
            method: 'POST',
            url: `http://localhost:3001/user/login`,
            data: data,
        }).then(res=>
        dispatch({
            type: SET_USER,
            payload: res.data})
        ).catch(err=>
            console.log(err)
    )}
}

export function changeUserData(data,id,token){
    return function(dispatch){
        console.log("el action")
        return axios({
            method: 'PUT',
            url:`http://localhost:3001/user/profile/${id}`,
            data:data,
            credentials: "include",
            headers: {"auth-token": token},

        }).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log(error)
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