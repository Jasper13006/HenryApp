import axios from 'axios';
import Swal from 'sweetalert2';

export function agregarClase(data){
    const token = localStorage.getItem("token")
    console.log(data)
    return function(dispatch){
        return axios({
            method: "POST",
            url: `http://localhost:3001/modulo/create`,
            headers: {"auth-token": token},
            data: data,
        })
        .catch(error => {
            console.log(error)
        })
    }
}