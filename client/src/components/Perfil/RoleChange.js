import React, {useState,useEffect} from 'react'
import {Select } from "@material-ui/core"
import axios from 'axios'



export default function RoleChange({user,token}){
    const [value,setValue]=useState(null)
    const [active,setActive]=useState(null)

    useEffect(()=>{
        if(user){
            console.log(user)
            if(user.admin){
                setValue("admin")
            }
            else if (user.instructor){
                setValue("instructor")
            }
            else if (user.pm){
                setValue("pm")
            }
            else{
                setValue("student")
            }
            setActive(user.active)
        }
    },[])

    const handleChange=(e)=>{
        e.preventDefault()
        let data = {
            role:value,
            estado:true
        }
        console.log(e.target.value)
        if(e.target.value==='habilitar'){
            setActive(true)
            data.role="active"
            data.estado=true
        }
        else if(e.target.value==='deshabilitar'){
            setActive(false)
            data.role="active"
            data.estado=false
        }
        else{
            setValue(e.target.value)
            data.role=e.target.value
        }
        axios({
            method: 'PUT',
            url:`http://localhost:3001/user/promote/${user.id}`,
            data:data,
            credentials: "include",
            headers: {"auth-token": token},
        }).then(res=>res.data)
        .then(data=>console.log(data))  
    }


    return(
        <Select
            native
            name="rol"
            onChange={handleChange}
            variant="outlined"
            size="small"
            value={value}>
                {active?
                <>
                <option value="admin">Admin</option>
                <option value="student">Estudiante</option>
                <option value="pm">PM</option>
                <option value="instructor">Instructor</option>
                <option value="deshabilitar">Deshabilitar</option>
                </>:
                <>
                <option value="deshabilitar">Deshabilitado</option>
                <option value="habilitar">Habilitar</option></>}
        </Select>
    )
}
