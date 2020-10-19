import React, {useState,useEffect} from 'react'
import { Button, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { getStudents } from '../../redux/actions/user'
import Circle from './Circle'

const useStyles = makeStyles(() => ({
    root: {
        borderRadius: '0px',
        display: 'flex',
        flexDirection: 'column',
        padding:'20px',
        width: '100%',
        margin:'auto',
    },
    privacyTable: {
        borderRadius: '10px',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    resultados:{
        textAlign:'center',
        marginTop:'10px',
    },
    strong:{
        fontWeight:'600',
    },
}));

const rh = [
    {name: 'Jeremias', lastName:'Koch', email: 'jeremias@soyhenry.com', gitHub:'jere8',linkedIn:'linkedIn',estado:'on'},
    {name: 'Miguel', lastName:'Ventura', email: 'no', gitHub:'miguel_v',linkedIn:'linkedIn',estado:'off'},
    {name: 'Raul', lastName:'Sánchez', email: 'raul@sanchez.com', gitHub:'no',linkedIn:'no',estado:'on'},
    {name: 'María', lastName:'Bernstein', email: 'maria@ber.com', gitHub:'marber2',linkedIn:'linkedIn',estado:'on'},
    {name: 'Jesus', lastName:'Jiménez', email: 'jisus@henry.com', gitHub:'jesus33',linkedIn:'no',estado:'no'},
    {name: 'Rafael', lastName:'Vidal', email: 'rafa@soyhenry.com', gitHub:'no',linkedIn:'linkedIn',estado:'no'},
    {name: 'Jorge', lastName:'González', email: 'jorge@gon.com', gitHub:'jgon4',linkedIn:'linkedIn',estado:'on'},
    {name: 'Amanda', lastName:'Ramírez', email: 'no', gitHub:'no',linkedIn:'linkedIn',estado:'off'}
]

export default function UserConfig({token,id}){
    const classes= useStyles()
    const [privacy,setPrivacy] = useState(null)
    const [updater,setUpdater] = useState(0)
    const [resultados,setResultados] = useState(null)
    const [filter,setFilter] = useState(null)
    // const usuarios = useSelector(state => state.students.data)
    // const dispatch=useDispatch()

    useEffect(()=>{
        axios({
            method: 'POST',
            url: `http://localhost:3001/user/get_privacy`,
            data:{userId: id},
            credentials: "include",
            headers: {"auth-token": token},
        }).then(res=>res.data)
        .then(data=>{
            if(data){
                setPrivacy(data.userPrivacy)
            }
        })
    },[updater])

    useEffect(()=>{
        if(!privacy || privacy.userPrivacy===null){
            axios({
                method: 'POST',
                url:`http://localhost:3001/user/set_privacy`,
                data:{
                    userId: id,
                },
                credentials: "include",
                headers: {"auth-token": token},
            }).then(res=>res.data)
            .then(data=>{
                console.log("respuesta: ",data)
                setUpdater(updater+1)
            })
        }
        
    },[])

    // useEffect(()=> {
    //     dispatch(getStudents())
    // })

    const handleChange=async(e)=>{
        setPrivacy({...privacy, [e.target.name] : e.target.value})
        axios({
            method: 'PUT',
            url:`http://localhost:3001/user/change_privacy`,
            data:{...privacy, [e.target.name] : e.target.value},
            credentials: "include",
            headers: {"auth-token": token},
        }).then(res=>res.data)
        .then(data=>console.log(data))
    }

    const handleFilter=()=>{

    }
    
    const suprimir=(string)=>{
        if(string==="no"){
            return("---")
        }
        return(string)
    }

    if(privacy){
        console.log("privacy: ",privacy)
    }

    return(
        <Paper className={classes.root}>
            <Typography component="h6" variant="h6">Privacidad</Typography>
            {privacy &&
            <Table className={classes.privacyTable}>
                <TableBody >
                    <TableRow>
                        <TableCell>Quién puede ver mi correo electrónico</TableCell>
                        <TableCell>
                            <Select
                                native
                                name="email"
                                value={privacy.email}
                                onChange={handleChange}>
                                <option value="henry">Solo el equipo de Henry</option>
                                <option value="cohorte">Equipo de Henry y mis compañeros de cohorte</option>
                                <option value="todos">Toda la comunidad de Henry</option>
                            </Select>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Quién puede ver mi estado en línea</TableCell>
                        <TableCell>
                            <Select
                                native
                                name="onLineStatus"
                                value={privacy.onLineStatus}
                                onChange={handleChange}>
                                <option value="henry">Solo el equipo de Henry</option>
                                <option value="cohorte">Equipo de Henry y mis compañeros de cohorte</option>
                                <option value="todos">Toda la comunidad de Henry</option>
                            </Select>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Compartir usuario de GitHub</TableCell>
                        <TableCell>
                            <Select
                                native
                                name="gitHub"
                                value={privacy.gitHub}
                                onChange={handleChange}>
                                <option value="henry">Solo con el equipo de Henry</option>
                                <option value="cohorte">Equipo de Henry y mis compañeros de cohorte</option>
                                <option value="todos">A Toda la comunidad de Henry</option>
                            </Select>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Compartir enlace de LinkedIn</TableCell>
                        <TableCell>
                            <Select
                                native
                                name="linkedIn"
                                value={privacy.linkedIn}
                                onChange={handleChange}>
                                <option value="henry">Solo el equipo de Henry</option>
                                <option value="cohorte">Equipo de Henry y mis compañeros de cohorte</option>
                                <option value="todos">Toda la comunidad de Henry</option>
                            </Select>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>}
            <br/><br/>
            <Typography component="h6" variant="h6">Búsqueda avanzada</Typography>
            <Table size="small" className={classes.privacyTable}>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido</TableCell>
                        <TableCell>Cohorte</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <TextField variant="outlined"></TextField>
                        </TableCell>
                        <TableCell>
                            <TextField variant="outlined"></TextField>
                        </TableCell>
                        <TableCell>
                            <TextField variant="outlined"></TextField>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Typography className={classes.resultados}>8 resultados</Typography>
            {rh &&
            <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell className={classes.strong}>Nombre</TableCell>
                    <TableCell className={classes.strong}>Apellido</TableCell>
                    <TableCell className={classes.strong}>Email</TableCell>
                    <TableCell className={classes.strong}>GitHub</TableCell>
                    <TableCell className={classes.strong}>LinkedIn</TableCell>
                    <TableCell className={classes.strong}>Estado</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rh.map((result,index)=>
                <TableRow key={index}>
                    <TableCell>
                        {result.name}
                    </TableCell>
                    <TableCell>
                        {result.lastName}
                    </TableCell>
                    <TableCell>
                        {suprimir(result.email)}
                    </TableCell>
                    <TableCell>
                        {result.gitHub!=="no"?
                        <Button variant="outlined">{result.gitHub}</Button>
                        :"---"}
                    </TableCell>
                    <TableCell>
                        <Button variant="outlined">Ir</Button>
                    </TableCell>
                    <TableCell>
                        {<Circle state={result.estado}/>}
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
            }
        </Paper>
        
    )
}