import React,{useEffect,useState} from 'react'
import './Perfil.css'
import {useSelector} from 'react-redux'


export default function Perfil(){
    const [option,setOption] =useState(0)
    const menuOption=useSelector(state=>state.panel.data)
    
    useEffect(()=>{
        setOption(menuOption)
    },[menuOption])

    return (
        <div>
            {option?
            <h1>Perfil{" "+option.toString()}</h1>:
            <h1>Perfil 0</h1>}
            
        </div>
    )
}