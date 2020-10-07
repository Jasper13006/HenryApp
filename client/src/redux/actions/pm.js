import axios from 'axios'
import Swal from 'sweetalert2'
import { GET_PM, GET_GROUP_PM, GET_GROUP_PM_COHORTE } from '../consts/actionTypes'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAxNzYxMzcwfQ.jT_7aowpVaeCYDsi0omaUHzmBRc9NROtciAXcs57h6w"

export function traerPm() {
    return function (dispatch) {
        return axios({
            method: 'GET',
            url: `http://localhost:3001/user/pms`,
        })

            .then(res => {
                dispatch({
                    type: GET_PM,
                    payload: res.data
                })
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function traerGrupoPm(id, data) {
    return function (dispatch) {
        return axios({
            method: 'GET',
            url: `http://localhost:3001/cohorte/group-pm/${id}`,
            data: data,
            credentials: "include",
            headers: { "auth-token": token },
        })

            .then(res => {
                dispatch({
                    type: GET_GROUP_PM,
                    payload: res.data
                })
            })
            .catch(e => {

                Swal.fire({
                    icon: 'error',
                    title: 'No hay nada por aquí',
                    showConfirmButton: false,
                    timer: 1500
                })
                // window.location.assign("http://localhost:3000/panel/perfil")
            })
    }
}

export function traerGrupoPmPorCohorte(id, data) {
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
                // window.location.assign("http://localhost:3000/panel/perfil")
            })
    }
}

