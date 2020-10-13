import React,{useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {makeStyles,Button} from '@material-ui/core/';
import Process from './Process'
import Swal from 'sweetalert2'
import Axios from 'axios';


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



export default function MaterialTableDemo({data,submit,reset}) {
    const classes = useStyles();
    const [open,setOpen] = useState(false)
    const [state, setState] = React.useState({
        columns: [
        { title: 'Name', field: 'name' },
        { title: 'Email', field: 'email' },
        { title: 'Error', field: 'err' },
        ],
        data:[]
    });
    const [progress,setProgress] = useState(0)
    const [control,setControl] = useState (false)
    
    async function sendEmail (dato){       
        try {                        
            const send = await Axios.post('http://localhost:3001/invite/send',dato)            
            if(send.data.status === 400){
                new Promise((resolve) => {
                    setTimeout(() => {
                    resolve();                  
                    setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(dato)]['err'] = send.data.msg;
                    return { ...prevState, data };
                    }); 
                    setProgress((prevProgress)=> {
                        const acum = prevProgress + (100/state.data.length)
                        return acum
                    })                   
                    }, 600);
                })
            }
            else{
                new Promise((resolve) => {
                    setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(dato), 1);
                        return { ...prevState, data };
                    });
                    setProgress((prevProgress)=> {
                        const acum = prevProgress + (100/state.data.length)
                        return acum
                    })
                    }, 600);
                })

            }                                
            
        }catch(err){
            console.log(err.msg)
            let acum = progress + (100/data.length)  
            new Promise((resolve) => {
                setTimeout(() => {
                resolve();
                setProgress((prevProgress)=> {
                    const acum = prevProgress + (100/state.data.length)
                    return acum
                })
                }, 600);
            })
        } 
        
    }  

    
    useEffect(() => {
        
        if(!state.data.length && !control){
            let datos = []
            data.shift()
            data.map((user)=>{   
                if(user[0] || user[1]) {
                    if(!/\S+@\S+\.\S+/.test(user[1])){
                        console.log('entro')
                        datos.push({name:user[0],email:user[1],err:'email invalido'})
                    }else{
                        datos.push({name:user[0],email:user[1]})
                    }
                }               
            })
            setControl(true)
            setState({
                ...state,
                data:datos
            })
        }
    })    
    

    const handleSubmit = (data) => {
        
        if(data.length){
            setOpen(true)
            data.map((dato)=>{
                
                sendEmail(dato)
                
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "no tienes emails para enviar"
                
            }) 
        }
           
    }

    const handleClose = () => {
        setOpen(false);
        setProgress(0)
        if(!state.data.length){
            Swal.fire({
                icon: 'success',
                title: 'Se han enviado tus invitaciones',
                
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "algunos emails no pudieron ser enviados, revisa los errores en la tabla"
                
            })
        }
        
    };
    return (
        <div className={classes.table}>
            <MaterialTable            
            title="Tabla de Emails"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                    });
                    }, 600);
                }),
                onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                    resolve();
                    if(/\S+@\S+\.\S+/.test(newData.email)){
                       newData.err = null
                    }else{
                        newData['err']='email invalido'
                    }
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
            <Button
                onClick={() => handleSubmit(state.data)}
                fullWidth
                variant="contained"
                className={classes.submit}
            >
                Enviar
            </Button>
            {open && <Process open={open} handleClose={ handleClose} progress={progress}/>}
            
        </div>
        
    );
}