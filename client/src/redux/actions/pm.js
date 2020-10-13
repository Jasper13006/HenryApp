import axios from 'axios'
import Swal from 'sweetalert2'
import { GET_PM, GET_GROUP_PM, GET_GROUP_PM_COHORTE, ADD_GROUP_PM } from '../consts/actionTypes'


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
        const token = localStorage.getItem("token")
        return axios({
            method: 'GET',
            url: `http://localhost:3001/cohorte/group-pm/${id}`,
            credentials: "include",
            headers: { "auth-token": token },
        })

            .then(res => {
                dispatch({
                    type: GET_GROUP_PM,
                    payload: res.data
                })
            })
        // .catch(e => {
        //     console.log(e)
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'No hay nada por aquí',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //     window.location.assign("http://localhost:3000/panel/perfil")
        // })
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
                window.location.assign("http://localhost:3000/panel")
            })
    }
}


export function agregarGrupoPm(data) {
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
                    title: 'Agregado correctamente',
                    showConfirmButton: false,
                    timer: 1000
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
