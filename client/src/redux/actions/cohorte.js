import axios from 'axios'
import Header from '../../components/panel/Header'
import { GET_MY_COHORTE, GET_STUDENTS_BY_COHORTE_ID } from '../consts/actionTypes'

export function getCohorteUser(id){
    return function(dispatch){
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
        .catch(err => alert(err.message))
    }
}

export function getAlumnosCohorte(id){
    return function(dispatch){
        const token = localStorage.getItem("token")
        return axios({
            method: "GET",
            url: `http://localhost:3001/student/cohorte/${id}`,
            credentials: "include",
            headers: {"auth-token": token},

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