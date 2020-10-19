import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Typography, Select, MenuItem } from '@material-ui/core'
import Table from './Table'

export default function Notas(){    
    const token = localStorage.getItem("token") 
    const [cohortes,setCohortes] = useState('')
    const [cohortesel,setCohortesel] = useState('')  
    const [students,setStudents] = useState('')

    useEffect(() => {        
        axios({
            method: 'GET',
            url: 'http://localhost:3001/cohorte',
            
            })   
            .then(res=> setCohortes(res.data)) 
            .catch(err=> console.log(err));                                  
    }, []) 

    useEffect(() => {        
        axios({
            method: 'GET',
            url: `http://localhost:3001/student/cohorte/${cohortesel}`,
            credentials: "include",
            headers: { "auth-token": token }            
            })   
            .then(res=> setStudents(res.data)) 
            .catch(err=> console.log(err));                                  
    }, [cohortesel])   

    const handleNameChange = (e) => {
        setCohortesel(e.target.value)                   
    }

    return (        
        <div>
            <h1>Tabla</h1>            
            {!students &&
            <div>
            <Typography>Seleccionar Cohorte</Typography>             
            <Select label="Cohorte" onChange={handleNameChange} value={cohortesel}>
                {cohortes && cohortes.map((c)=>
                <MenuItem value={c.id}>{c.name}</MenuItem>)}                   
            </Select> 
                </div>}           
            {students.length >0 && <Table data={students}/>}            
        </div>
    )
}