import axios from 'axios';
import { USER_LOGIN } from '../consts/actionTypes'
import Swal from 'sweetalert2'

export function postLogin(data) {
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: `http://localhost:3001/user/login`,
            data: data,

        })
            .then(res => {

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
                window.location.assign("http://localhost:3000/panel")
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