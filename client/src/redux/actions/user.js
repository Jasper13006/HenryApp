import axios from 'axios'
import { GET_USER, GET_INSTRUCTORS, GET_USERS, GET_STUDENTS, STUDENT_BY_USER_ID } from '../consts/actionTypes'
import { SET_USER } from '../consts/actionTypes'

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
            console.log(res.status)
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

export function getStudents(){
    return function(dispatch){
        const token = localStorage.getItem("token")
        return axios({
            method: "GET",
            url: `http://localhost:3001/student`,
            headers: {"auth-token": token}
        })
        .then(response => {
            dispatch({
                type: GET_STUDENTS,
                payload: response.data
            })
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
        })
    }
}

export function getStudent(id){
    return function(dispatch){
        const token = localStorage.getItem("token")
        return axios({
            method: "GET",
            url: `http://localhost:3001/student/info/${id}`,
            headers: {"auth-token": token}
        })
        .then(response => {
            dispatch({
                type: STUDENT_BY_USER_ID,
                payload: response.data
            })
        })
        .catch(error => {
            // console.log("no se pudo obtener los datos del estudiante ya que no aparece como estudiante en los registros")
        })
    }
}