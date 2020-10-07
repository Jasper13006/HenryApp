import axios from 'axios'
import { SET_USER } from '../consts/actionTypes'



export function setUser(data){
    return function(dispatch){
        return axios({
            method: 'POST',
            url: `http://localhost:3001/user/login`,
            data: data,
        }).then(res=>
        dispatch({
            type: SET_USER,
            payload: res.data})
        ).catch(err=>
            console.log(err)
    )}
}

export function changeUserData(data,id,token){
    return function(dispatch){
        console.log("el action")
        return axios({
            method: 'PUT',
            url:`http://localhost:3001/user/profile/${id}`,
            data:data,
            credentials: "include",
            headers: {"auth-token": token},

        }).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log(error)
        })
    }
}