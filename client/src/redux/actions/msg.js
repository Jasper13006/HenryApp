import Axios from 'axios'
import axios from 'axios'
import {ADD_NEWMSG,GET_CHATS,GET_MSG,DELETE_MSGS} from '../consts/actionTypes'

export function addMsg(data,token){
    
    return async function(dispatch){
        try {
            const newMsg = await axios({
                method: 'POST',
                url:`http://localhost:3001/msg`,
                data:data,
                credentials: "include",
                headers: {
                    "auth-token": token,
                },
            })
            data['updatedAt'] = newMsg.data.updatedAt;
            data['chatBack'] = newMsg.data
            return dispatch({
                type: ADD_NEWMSG,
                payload: data
            })
        }       
        catch(err) {console.log(err)}
        
        
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
            return dispatch ({
                type:GET_CHATS,
                payload:chats.data
            })
        }
        catch(err) {console.log(err)}
        
    }
}

export function getMsg (chatId,token){
    return async function (dispatch){
        try{
            const allMsg = await Axios({
                method:'GET',
                url:`http://localhost:3001/msg/${chatId}`,
                credentials:'include',
                headers:{
                    'auth-token':token
                }
            });
            return dispatch ({
                type:GET_MSG,
                payload:allMsg.data
            })
        }catch (err){
            console.log(err)
        }
    }
}

export function deleteMsgs (){
    return function (dispatch){
        return dispatch ({
            type:DELETE_MSGS,
        })
    }
}