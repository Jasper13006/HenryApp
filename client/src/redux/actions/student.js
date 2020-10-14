import axios from 'axios';
import { GET_STUDENTS_BY_GROUP, ADD_STUDENT_TO_GROUP } from '../consts/actionTypes'
import Swal from 'sweetalert2'



export function traerAlumnosPorGrupo(id) {
    const token = localStorage.getItem("token")
    return function (dispatch) {

        return axios({
            method: 'GET',
            url: `http://localhost:3001/student/group-pm/${id}`,
            credentials: "include",
            headers: { "auth-token": token },
        })

            .then(res => {
                dispatch({
                    type: GET_STUDENTS_BY_GROUP,
                    payload: res.data
                })
            })
            .catch(e => {

                throw e;
            })
    }
}


export function agregarEstudianteAGrupo(id, data) {
    const token = localStorage.getItem("token")
    return function (dispatch) {

        return axios({
            method: 'PUT',
            url: `http://localhost:3001/cohorte/addStudent/${id}`,
            data: data,
            credentials: "include",
            headers: { "auth-token": token },
        })

            .then(res => {
                dispatch({
                    type: ADD_STUDENT_TO_GROUP,
                    payload: res.data
                })
                Swal.fire({
                    icon: 'success',
                    title: '¡Listo!',
                    text: "Se ha agreado al estudiante correctamente",
                })

            })
            .catch(e => {

                throw e.message;
            })
    }
}
