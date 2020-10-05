import axios from 'axios';
import { USER_LOGIN } from '../consts/actionTypes'
import Swal from 'sweetalert2'

export function postLogin(data) {
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: `http://localhost:3001/user/login`,
            data: data

        })
            .then(res => {
                // console.log('ESTOY EN EL .THEN edit', res)
                console.log(res.data.token)
                console.log(res.data.user.id)
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("idUser", res.data.user.id);
                dispatch({
                    type: USER_LOGIN,
                    payload: res.data.token
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Te has logueado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            ).catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email o contraseña incorrectos',
                    footer: '<a href=http://localhost:3000/olvidemicontraseña>No recuerda su contraseña?</a>'
                })
            })

    };
}