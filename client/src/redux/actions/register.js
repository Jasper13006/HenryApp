import axios from 'axios';
import { USER_REGISTER } from '../consts/actionTypes'
import Swal from 'sweetalert2'

export function postRegister(data,token) {
    console.log(data)
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: `http://localhost:3001/user/register/${token}`,
            data: data

        })
            .then(res => {
                if(res.data.status === 400){
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message,
                        // footer: '<a href=http://localhost:3000/olvidemicontraseña>No recuerda su contraseña?</a>'
                    })
                }
                else{
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
                
            }
            ).catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e,
                    // footer: '<a href=http://localhost:3000/olvidemicontraseña>No recuerda su contraseña?</a>'
                })
            })

    };
}