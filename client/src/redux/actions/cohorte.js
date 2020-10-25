import axios from 'axios'
import Header from '../../components/panel/Header'
import { GET_MY_COHORTE, GET_STUDENTS_BY_COHORTE_ID, GET_MODULOS, GET_COHORTES, CREATE_COHORT, EDIT_COHORT, ADD_USER_TO_A_COHORT } from '../consts/actionTypes'
import Swal from 'sweetalert2'
import students from '../reducers/students'


export function getCohorteUser(id) {
    return function (dispatch) {
        console.log(id)
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

// export const getCohorteUser = (id) => async dispatch => {
// 	try {
//         const token = localStorage.getItem("token")
//         axios({
//             method: 'GET',
//             url: `http://localhost:3001/cohorte/user/${id}`,
//             headers: { "auth-token": token }
//         })
//         .then(response => {
//             return dispatch({
//                 type: GET_MY_COHORTE,
//                 payload: response.data
//             })
//         })
// 		} catch (error) {
// 		console.log(error)
// 	}
// }

export function getAlumnosCohorte(id) {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        return axios({
            method: "GET",
            url: `http://localhost:3001/student/cohorte/${id}`,
            headers: { "auth-token": token },
        })
            .then(response => {
                return dispatch({
                    type: GET_STUDENTS_BY_COHORTE_ID,
                    payload: response.data
                })
            })
            .catch(error => {
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: error.message,
                // })
                console.log(error)
            })
    }
}

export function getLinkVideos(id) {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        return axios({
            method: "GET",
            url: `http://localhost:3001/modulo/${id}`,
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
                //     text: error.message,
                // })
                console.log(error)
            })
    }
}

export function createCohort(cohorte) {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        return axios({
            method: "POST",
            url: "http://localhost:3001/cohorte/create",
            data: cohorte,
            headers: { "auth-token": token }
        })
            .then((response) => {
                dispatch({
                    type: CREATE_COHORT,
                    payload: response.data
                })
                Swal.fire({
                    icon: 'success',
                    title: '¡Listo!',
                    text: "Se ha creado el cohorte correctamente",
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

export function editCohort(id, cohortData) {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        return axios({
            method: "PUT",
            url: `http://localhost:3001/cohorte/modifyCohort/${id}`,
            headers: { "auth-token": token },
            data: cohortData
        })

            .then(response => {
                dispatch({
                    type: EDIT_COHORT,
                    payload: response.data
                })
                Swal.fire({
                    icon: 'success',
                    title: '!Se ha editado¡',
                    text: "El cohorte ha sido modificado"
                })
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Verifica bien que el usuario que has agregado no sea parte de un cohorte existente"
                })
            })
    }
}

export function addUserToACohort(cohorteId, userId) {
    return function (dispatch) {
        console.log("id del cohorte: ", cohorteId, "id del usuario:", userId)
        const token = localStorage.getItem("token")
        return axios({
            method: "POST",
            url: `http://localhost:3001/cohorte/addStudent/${cohorteId}`,
            headers: { "auth-token": token },
            data: { "userId": userId }
        })
            .then(response => {
                return
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Verifica que el estudiante que estas por agregar no sea participante de algun otro cohorte"
                })
            })
    }
}