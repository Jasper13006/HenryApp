// import {useState, useEffect} from 'react'

export default function useFetch(url){
    return async function(params){
        let out=null
        await fetch(url + params.toString())
        .then(res=>res.json())
        .then(data=>{
            out=data
        })
        .catch(e=>{
            console.log(e)
        })
        return(out)
    }
}
