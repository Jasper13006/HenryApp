import axios from 'axios';
import { USER_REGISTER } from '../consts/actionTypes'
import Swal from 'sweetalert2'

export function postRegister(data) {
    console.log(data)
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: `http://localhost:3001/user/register`,
            data: data

        })
            .then(res => {
                console.log('ESTOY EN EL .THEN edit', res)
                dispatch({
                    type: USER_REGISTER,
                    payload: res.data
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Te has registrado correctamente! Revisa tu correo!',
                    showConfirmButton: false,
                    timer: 3000
                }).then(function() {
                    window.location = 'http://localhost:3000/login';
                });
            }
            ).catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ha ocurrido un error inesperado... inténtelo mas tarde',
                    // footer: '<a href=http://localhost:3000/olvidemicontraseña>No recuerda su contraseña?</a>'
                })
            })

    };
}