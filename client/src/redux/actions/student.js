import axios from 'axios';
import { GET_STUDENTS_BY_GROUP, ADD_STUDENT_TO_GROUP, MIGRACION } from '../consts/actionTypes'
import Swal from 'sweetalert2'
import { update } from './update'



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
                console.log(res)
                dispatch({
                    type: ADD_STUDENT_TO_GROUP,
                    payload: res.data
                })
                // Swal.fire({
                //     icon: 'success',
                //     title: '¡Listo!',
                //     text: "Se ha agreado al estudiante correctamente",
                // })

            })
            .catch(e => {

                alert(e.message);
            })
    }
}

export function migrarStudent(cohorteId, alumnoId){
    const token = localStorage.getItem("token")
    return function(dispatch){
        return axios({
            method: "PUT",
            url: `http://localhost:3001/student/modify/${alumnoId}`,
            headers: {"auth-token": token},
            data: {"cohorteId": cohorteId},
        })
        .then(response => {
                Swal.fire(
                    'Migracion completa!',
                    'El alumno fue migrado.',
                    'success',
                )
                dispatch(update())
        })
        .catch(error => {
            if(error.message == "el estudiante ya es parte de ese cohorte"){
                return Swal.fire(
                    'Migracion fallida!',
                    'El estudiante ya es parte de ese cohorte.',
                    'error',
                )
            }
            Swal.fire(
                'Migracion fallida!',
                'verifica bien los datos.',
                'error',
            )
        })
    }
}
