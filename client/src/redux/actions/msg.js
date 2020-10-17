import Axios from 'axios'
import axios from 'axios'
import {ADD_NEWMSG,GET_CHATS} from '../consts/actionTypes'

export function addMsg(data,token){
    
    return function(dispatch){
        return axios({
            method: 'POST',
            url:`http://localhost:3001/msg`,
            data:data,
            credentials: "include",
            headers: {
                "auth-token": token,
            },
        })
        .then((res)=>{
            console.log(res)
            data['createdAt'] = res.data.createdAt
            dispatch({
                type: ADD_NEWMSG,
                payload: data
            })
        }).catch(err => console.log(err))
        
        
    }
}

export function getChats(token){
    return async function (dispatch){
        try{
            const chats = await Axios({
                method:'GET',
                url:`http://localhost:3001/msg/chat`,
                credentials:'include',
                headers:{
                    'auth-token':token
                }
            })
            console.log(chats)
            return dispatch ({
                type:GET_CHATS,
                payload:chats.data
            })
        }
        catch(err) {console.log(err)}
        
    }
}