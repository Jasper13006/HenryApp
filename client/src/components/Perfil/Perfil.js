import React,{useEffect,useState} from 'react'
import './Perfil.css'
import store from '../../redux/store/index'




export default function Perfil(){
    const [option,setOption] =useState(null)

    useEffect(()=>{
        console.log(store.getState().panel.data)
        store.subscribe(()=>{
        setOption(store.getState().panel.data)
        })
    },)

    return (
        <div>
            <h1>Perfil</h1>
        </div>
    )
}