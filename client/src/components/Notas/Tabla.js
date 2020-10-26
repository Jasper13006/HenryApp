import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Typography, Select, MenuItem } from '@material-ui/core'
import Table from './Table'

export default function Notas(){    
    const token = localStorage.getItem("token") 
    const [cohortes,setCohortes] = useState('')
    const [cohortesel,setCohortesel] = useState('')  
    const [students,setStudents] = useState('')
    const [name, setName] = useState('');

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

    const handleCohorChange = (e) => {
        setCohortesel(e.target.value)                   
    }

    const handleNameChange = (e) => {
        setName(e.target.value)            
    }

    return (        
        <div>
            <h1>Tabla</h1>            
            {!students &&
            <div>
            <Typography><strong>Seleccionar instancia</strong></Typography>
            <Select
                label="Instancia"                        
                value={name}
                onChange={handleNameChange}
                >
                <MenuItem value={'check1'}>Check1</MenuItem>
                <MenuItem value={'check2'}>Check2</MenuItem>
                <MenuItem value={'check3'}>Check3</MenuItem>
                <MenuItem value={'check4'}>Check4</MenuItem>
                <MenuItem value={'henrylab'}>Henrylab</MenuItem>
            </Select>  
            {name && <div>
            <Typography><strong>Seleccionar Cohorte</strong></Typography>             
            <Select label="Cohorte" onChange={handleCohorChange} value={cohortesel}>
                {cohortes && cohortes.map((c)=>
                <MenuItem value={c.id}>{c.name}</MenuItem>)}                   
            </Select>
                </div>} 
                </div>}           
            {students.length >0 && <Table data={students} name={name}/>}            
        </div>
    )
}