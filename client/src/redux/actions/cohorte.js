import axios from 'axios'
import Header from '../../components/panel/Header'
import { GET_MY_COHORTE, GET_STUDENTS_BY_COHORTE_ID, GET_MODULOS, GET_COHORTES } from '../consts/actionTypes'
import Swal from 'sweetalert2'

export function getCohorteUser(id) {
    return function (dispatch) {
        return axios({
            method: 'GET',
            url: `http://localhost:3001/cohorte/${id}`,
        })
            .then(response => {
                return dispatch({
                    type: GET_MY_COHORTE,
                    payload: response.data
                })
            })
            // .catch(err => {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Oops...',
            //         text: "No eres parte de ningun cohorte",
            //     })
            //     setTimeout(() => {
            //         window.location.assign("/panel")
            //     }, 800)
            // })
    }
}

export function getAlumnosCohorte(id) {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        return axios({
            method: "GET",
            url: `http://localhost:3001/student/cohorte/${id}`,
            credentials: "include",
            headers: { "auth-token": token },

        })
            .then(response => {
                return dispatch({
                    type: GET_STUDENTS_BY_COHORTE_ID,
                    payload: response.data
                })
            })
            .catch(error => {
                alert(error.message)
            })
    }
}

export function getLinkVideos() {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        return axios({
            method: "GET",
            url: `http://localhost:3001/modulo`,
            credentials: "include",
            headers: { "auth-token": token }
        })
            .then(response => {
                dispatch({
                    type: GET_MODULOS,
                    payload: response.data
                })
            })
    }
}

export function getCohortes() {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        return axios({
            method: "GET",
            url: `http://localhost:3001/cohorte/`,
            credentials: "include",
            headers: { "auth-token": token }
        })
            .then(res => {
                dispatch({
                    type: GET_COHORTES,
                    payload: res.data
                })
            })
            .catch(error => {
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: "No eres parte de ningun cohorte",
                // })
                // setTimeout(() => {
                //     window.location.assign("/panel")
                // }, 800)
            })
    }
}

