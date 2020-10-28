import axios from 'axios';
import { GET_GROUPS_PP, GET_STUDENT_BY_GROUPP_ID, GET_MY_GROUP_PP, NEW_STUDENT_IN_GROUP_PP } from '../consts/actionTypes'

export function groupPPbyPmId(id){
    console.log(id)
    const token = localStorage.getItem("token")
    return function(dispatch){
        return axios({
            method: "GET",
            url: `http://localhost:3001/groupPp/groups/${id}`,
            headers: {"auth-token": token}
        })
        .then(response => {
            dispatch({
                type: GET_GROUPS_PP,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error.message)
        })
    }
}

export function getStudentsByGrouppId(id){
    const token = localStorage.getItem("token")
    return function(dispatch){
        return axios({
            method: "GET",
            url: `http://localhost:3001/student/group-pp/${id}`,
            headers: {"auth-token": token}
        })
        .then(response => {
            dispatch({
                type: GET_STUDENT_BY_GROUPP_ID,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error.message)
        })
    }
}

export function getMyGroupPp(id){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAxODM3NjkxfQ.UYqdTSGIkG4bZpuHA0tyxUae6ph1pphJYVAcufXCLYc"
    return function(dispatch){
        return axios({
            method: "GET",
            url: `http://localhost:3001/groupPp/${id}`,
            headers: {"auth-token": token}
        })
        .then(response => {
            dispatch({
                type: GET_MY_GROUP_PP,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error.message)
        })
    }
}

export function addStudentToGroupPp(cohorteId, data){
    console.log(data)
    const token = localStorage.getItem("token")
    return function(dispatch){
        return  axios({
            method: "PUT",
            url: `http://localhost:3001/cohorte/addStudent/${cohorteId}`,
            data: data,
            headers: {"auth-token": token}
        })
        .then((response) => {
            dispatch({
                type: NEW_STUDENT_IN_GROUP_PP,
                payload: response.data
            })
            console.log(response)
        })
        .catch(error=> {
            console.log("esto se rompio")
        })
    }
}