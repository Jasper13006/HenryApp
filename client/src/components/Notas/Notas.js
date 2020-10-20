import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Table, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core'

export default function Notas(){   
    const id = localStorage.getItem("idUser")    
    const token = localStorage.getItem("token") 
    const [notas,setnotas] = useState('')

    useEffect(() => {        
        axios({
            method: 'GET',
            url: `http://localhost:3001/user/nota-checkpoint/${id}`,
            credentials: "include",
            headers: { "auth-token": token },
            })   
            .then(res=> setnotas(res.data)) 
            .catch(err=> console.log(err))                        
    }, [])    
    
    return (        
        <div>
            <h1> Mis Notas</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Instancias</strong></TableCell>
                        <TableCell><strong>Calificación</strong></TableCell>
                        <TableCell><strong>Comentario</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {notas ? notas.map((nota,i)=>
                  <TableRow key={i}>
                   <TableCell component='th' scope='row'>{nota.name}</TableCell>
                   <TableCell>{nota.qualification}</TableCell>
                   <TableCell>{nota.info}</TableCell>
                  </TableRow>
                  )
                  : <p> No has sido calificado aún </p>
                  } 
                </TableBody>
          
            </Table>
        </div>
    )
}