import React,{useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {makeStyles,Button, MenuItem, Select, Typography} from '@material-ui/core/';
import Swal from 'sweetalert2'
import axios from 'axios';


const useStyles = makeStyles((theme) => ({  
    table:{
        paddingTop:'30px',
        width:'100%'
    },
    submit: {
        backgroundColor:'yellow',
        color:'black',
        '&:hover': {
            backgroundColor: 'black',
            color: 'yellow'
        }
        
    },
}))

export default function Table({data}) {
    const classes = useStyles();   
    const [state, setState] = React.useState({
        columns: [
        { title: 'Name', field: 'name' , editable: "never"},
        { title: 'Email', field: 'email', editable: "never" },
        { title: 'Qualification', field: 'qualification' },
        { title: 'Info', field: 'info' },
        ],
        data:[]
    });    
    const [control,setControl] = useState (false)
    const [name, setName] = useState('');
    const token = localStorage.getItem("token")  
    
    async function sendQualification (dato){        
        if(dato.qualification === "Sin Calificar") return   
        const data0 = { name: name}  
        const data = {                
            name: name,
            qualification: dato.qualification,
            info: dato.info                
        }
        const notarepetida = await axios({
            method: 'POST',
            url: `http://localhost:3001/user/nota-checkpoint/repetida/${dato.userId}`,
            credentials: "include",
            headers: { "auth-token": token },
            data: data0
        })            
        if (notarepetida.data){
            await axios({
                method: 'PUT',
                url: `http://localhost:3001/user/nota-checkpoint/${dato.userId}`,
                credentials: "include",
                headers: { "auth-token": token },
                data: data
                })                 
        }else{                
            await axios({
            method: 'POST',
            url: `http://localhost:3001/user/nota-checkpoint/${dato.userId}`,
            credentials: "include",
            headers: { "auth-token": token },
            data: data
            })
        }        
    }   
    
    useEffect(() => {        
        if(!state.data.length && !control){
            let datos = []
            data && data.map((d)=>{   
                datos.push({name:d.user.name + ' ' + d.user.lastName,
                            email:d.user.email,
                            qualification: 'Sin Calificar',
                            info:'Sin Comentarios',
                            userId: d.userId
                        })                              
            })
            setControl(true)
            setState({
                ...state,
                data:datos
           })
       }
    }, [])      
    
    const handleNameChange = (e) => {
        setName(e.target.value)            
    }
    const handleSubmit = (data) => {        
        if(data.length){           
            data.map((dato)=>{ 
                sendQualification(dato)               
            })
        }
        Swal.fire('Success', 'calificaciones actualizadas', 'success')
   }
 
    return (
        <div className={classes.table}>           
            <MaterialTable            
            title="Tabla de Estudiantes"
            columns={state.columns}
            data={state.data}
            options={{
                pageSize: 5,
                pageSizeOptions: [5, 75, 150],
                sorting: false
                }}
            editable={{
                // onRowAdd: (newData) =>
                // new Promise((resolve) => {
                //     setTimeout(() => {
                //     resolve();
                //     setState((prevState) => {
                //         const data = [...prevState.data];
                //         data.push(newData);
                //         return { ...prevState, data };
                //     });
                //     }, 600);
                // }),
                onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                    resolve();
                    if (oldData) {
                        setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                        });
                    }
                    }, 600);
                }),
                onRowDelete: (oldData) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                    });
                    }, 600);
                }),
                }}
            />
            <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "column",
                         height: '200px', marginTop:'50px'}}>
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
            <Button
                onClick={() => handleSubmit(state.data)}
                //fullWidth
                variant="contained"
                className={classes.submit}
                disabled={!name}
            >
            Enviar
            </Button> 
            </div>                         
        </div>
        
    );
}