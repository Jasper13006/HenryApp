import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Table, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core'
import Swal from 'sweetalert2'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Notas(){     
    const token = localStorage.getItem("token") 
    const [notas,setnotas] = useState('')   
    const [mail,setmail] = useState('')
    const [errors,setErrors] = useState('')
    const [userId,setUserId] = useState('')  

    useEffect(() => {              
        axios({
            method: 'GET',
            url: `http://localhost:3001/user/nota-checkpoint/${userId}`,
            credentials: "include",
            headers: { "auth-token": token },
            })   
            .then(res=> setnotas(res.data)) 
            .catch(err=> console.log(err))                        
    }, [userId])   

    const validate = (mail) => {
        let errors = {};
        if (!mail) {          
            errors.email = 'Por favor, introduzca un email';
        } else if (!/\S+@\S+\.\S+/.test(mail)) {           
            errors.email = 'Por favor, introduzca un formato de email valido';
        }      
        return errors;
    };
   
    const handleInputChange = (e) => {
        setmail(e.target.value)
        setErrors(validate(e.target.value));       
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await axios({
            method: 'POST',
            url: 'http://localhost:3001/user/email',
            data: {email: mail}
            })         
        if (user.data.status == 400){   
            Swal.fire('Error', 'usuario inexistente', 'error');
            return}       
        if (user.data.status == 200){
            setUserId(user.data.usuario.id)
        }
    }
    
    return (        
        <div> 
             <form style={ {display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}noValidate onChange={handleInputChange} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={mail}
                    />
                    {errors.email && (
                        <p style={{ color: "red" }}>{errors.email}</p>
                    )}
                    <Button
                        type="submit"
                        style={{width: '100px', height: '50px', margin: '10px'}}
                        color="primary"
                        variant="contained"                        
                        disabled={!mail || errors.email}
                    >
                    Consultar Calificaciones
                    </Button>                    
                </form>                           
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
                  : userId ? <p> No ha sido calificado aún </p> :null
                  } 
                </TableBody>          
            </Table>
        </div>
        
    )
}