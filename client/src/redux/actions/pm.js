import axios from 'axios'
import Swal from 'sweetalert2'
import { GET_PM, GET_GROUP_PM, GET_GROUP_PM_COHORTE, ADD_GROUP_PM, EDIT_PMS } from '../consts/actionTypes'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAxNzYxMzcwfQ.jT_7aowpVaeCYDsi0omaUHzmBRc9NROtciAXcs57h6w"

export function traerPm(data) {
    const token = localStorage.getItem("token")
    return function (dispatch) {
        return axios({
            method: 'GET',
            url: "http://localhost:3001/user/pms",
            data: data,
            credentials: "include",
            headers: { "auth-token": token },

        })

            .then(res => {
                dispatch({
                    type: GET_PM,
                    payload: res.data
                })
            })
            .catch(e => {
                throw e;
            })
    }
}

export function traerGrupoPm(id) {
    return function (dispatch) {
        // const token = localStorage.getItem("token")
        return axios({
            method: 'GET',
            url: `http://localhost:3001/cohorte/group-pm/${id}`,
            // credentials: "include",
            headers: { "auth-token": token },
        })

            .then(res => {
                dispatch({
                    type: GET_GROUP_PM,
                    payload: res.data
                })
            })
            .catch(e => {
                console.log(e)
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'No hay nada por aquí',
                //         showConfirmButton: false,
                //         timer: 1500
                //     })
                //     window.location.assign("http://localhost:3000/panel/perfil")
            })
    }
}

export function traerGrupoPmPorCohorte(id, data) {
    const token = localStorage.getItem("token")
    return function (dispatch) {
        return axios({
            method: 'GET',
            url: `http://localhost:3001/cohorte/allGroup-pm/${id}`,
            data: data,
            credentials: "include",
            headers: { "auth-token": token },
        })

            .then(res => {
                dispatch({
                    type: GET_GROUP_PM_COHORTE,
                    payload: res.data
                })
            })
            .catch(e => {

                Swal.fire({
                    icon: 'error',
                    title: 'No existe grupo de PM',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }
}


export function agregarGrupoPm(data, history) {
    const token = localStorage.getItem("token")
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: `http://localhost:3001/cohorte/group-pm/create`,
            data: data,
            credentials: "include",
            headers: { "auth-token": token },
        })

            .then(res => {
                dispatch({
                    type: ADD_GROUP_PM,
                    payload: res.data
                })
                Swal.fire({
                    icon: 'success',
                    title: '¡Listo!',
                    showConfirmButton: false,
                    text: "Se ha creado el grupo correctamente",
                })

            })

            .catch(e => {

                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    showConfirmButton: false,
                    timer: 1500
                })

            })
    }
}

export function editGroupPm(id, data) {
    const token = localStorage.getItem("token")
    return function (dispatch) {
        return axios({
            method: "PUT",
            url: `http://localhost:3001/cohorte/group-pm/edit/${id}`,
            headers: { "auth-token": token },
            data: data
        })
            .then(res => {
                dispatch({
                    type: EDIT_PMS,
                    payload: res.data
                })
                Swal.fire({
                    icon: 'success',
                    title: '¡Listo!',
                    showConfirmButton: false,
                    text: "Se ha creado el grupo correctamente",
                })

            })

            .catch(e => {

                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    showConfirmButton: false,
                    timer: 1500
                })

            })
    }
}

