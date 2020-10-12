import axios from 'axios'
import { SET_USER, GET_INSTRUCTORS, GET_USERS } from '../consts/actionTypes'
import Swal from 'sweetalert2'

export function setUser(data){
    return async function(dispatch){
        return await (
        dispatch({
            type: SET_USER,
            payload: data})
        ).catch(err=>
            console.log(err)
    )}
}

export function setUserFromDB(id,token){
    return async function(dispatch){
        return await axios({
            method: 'GET',
            url: `http://localhost:3001/user/${id}`,
            credentials: 'include',
            headers: {"auth-token": token}
        }).then(res => {
            console.log(res.data)
            dispatch({
                type: SET_USER,
                payload: res.data})
        }).catch(err=> console.log(err))
    }
}

export function changeUserData(data,id,token){
    return async function(dispatch){
        return await axios({
            method: 'PUT',
            url:`http://localhost:3001/user/profile/${id}`,
            data:data,
            credentials: "include",
            headers: {"auth-token": token},

        }).then(res=>{
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: "Se han actualizado tus datos",
                })
        }).catch(error=>{
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'No ha sido posible actualizar tus datos',
                })
        })
    }
}

export function changeUserImage(data,id,token){
    return async function(dispatch){
        return await axios({
            method: 'PUT',
            url:`http://localhost:3001/user/profile/${id}`,
            data:data,
            credentials: "include",
            headers: {
                "auth-token": token,
                'Content-Type':'multipart/form-data; boundary=${form._boundary}'
            },
        }).then(res=>{
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: "Se ha actualizado tu foto de perfil",
                })
        }).catch(error=>{
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'No ha sido posible actualizar tu foto',
                })
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