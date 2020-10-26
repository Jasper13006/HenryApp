import React, {useState,useEffect} from 'react'
import { Button, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { getStudents } from '../../redux/actions/user'
import Circle from './Circle'
import RoleChange from './RoleChange'
import {traerUsuarios} from '../../redux/actions/user'

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

export default function UserConfig({token,id,user}){
    const classes= useStyles()
    const [privacy,setPrivacy] = useState(null)
    const [updater,setUpdater] = useState(0)
    const [privacyData,setPrivacyData]=useState(null)
    const [allPrivacy,setAllPrivacy] = useState(null)
    const [cohortes,setCohortes] = useState(null)
    const [filter,setFilter] = useState(null)
    const usuarios = useSelector(state => state.usuarios.data)
    const estudiantes = useSelector(state=>state.students.data)
    const dispatch=useDispatch()

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
        dispatch(traerUsuarios())
    },[updater])

    useEffect(()=>{
        if(!privacy){
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
                setUpdater(updater+1)
            })
        }
    },[privacy])

    useEffect(()=> {
        dispatch(getStudents())
    },[])

    useEffect(()=>{
        axios({
            method: 'POST',
            url: `http://localhost:3001/user/get_all_privacy`,
            credentials: "include",
            headers: {"auth-token": token},
        }).then(res=>res.data)
        .then(data=>{
            if(data){
                setAllPrivacy(data.usersPrivacy)
            }
        })
    },[])

    const handleChange=async(e)=>{
        e.preventDefault()
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

    useEffect(()=>{
        let obj = {}
        if(allPrivacy){
            for(let i of  allPrivacy){
                let element={}
                element={
                    emailP: i.emailP,
                    onLineStatus: i.onLineStatus,
                    gitHub: i.gitHub,
                    linkedIn: i.linkedIn
                }
                obj[i.user.id]=element
            }
            setPrivacyData(obj)
        }
    },[allPrivacy])

    useEffect(()=>{
        if(estudiantes){
            let coh = {}
            for(let i of estudiantes){
                coh[i.user.id]=i.cohorteId
            }
            setCohortes(coh)
        }
    },[estudiantes])

    const isPartOf=(str1,str2)=>{
        if(str1.toUpperCase().startsWith(str2.toUpperCase())){
            return(true)
        }
        return(false)
    }

    const handleFilter=(e)=>{
        setFilter({...filter, [e.target.name] : e.target.value})
    }

    const accessControl= (userId,type)=>{
        let priv = privacyData[userId]
        if(priv){
            if(user.admin){
                return(true) 
            }
            else if(user.instructor || user.pm){
                if(priv[type]==="cohorte" || priv[type]==="todos"){
                    return(true)
                }
            }
            else if(user.student){
                if(priv[type]==="todos"){
                    return(true)
                } 
            }
            return(false)
        }
        return(true)
    }

    const role=(usuario)=>{
        console.log(usuario)
        return("gato")
    }

    const findCohorte=(id)=>{
        if(id in cohortes){
            return (cohortes[id]).toString()
        }
        return(null)
    }

    
    return(
        <Paper className={classes.root}>
            <Typography component="h6" variant="h6">Privacidad</Typography>
            {privacy &&
            <Table className={classes.privacyTable} key="tabla1">
                <TableBody >
                    <TableRow>
                        <TableCell>Quién puede ver mi correo electrónico</TableCell>
                        <TableCell>
                            <Select
                                native
                                name="emailP"
                                value={privacy.emailP}
                                onChange={handleChange}>
                                <option value="henry">Solo el equipo de Henry</option>
                                <option value="cohorte">Equipo de Henry y PM</option>
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
                                <option value="cohorte">Equipo de Henry y PM</option>
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
                                <option value="cohorte">Equipo de Henry y PM</option>
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
                                <option value="cohorte">Equipo de Henry y PM</option>
                                <option value="todos">Toda la comunidad de Henry</option>
                            </Select>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>}
            <br/><br/>
            <Typography component="h6" variant="h6">Búsqueda avanzada</Typography>
            <Table size="small" className={classes.privacyTable} key="tabla2">
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
                            <TextField variant="outlined" onChange={handleFilter} name="nombre"></TextField>
                        </TableCell>
                        <TableCell>
                            <TextField variant="outlined" onChange={handleFilter} name="apellido"></TextField>
                        </TableCell>
                        <TableCell>
                            <TextField variant="outlined" onChange={handleFilter} name="cohorte"></TextField>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {usuarios &&
            <Table size="small" key="tabla3">
            <TableHead>
                <TableRow>
                    <TableCell className={classes.strong}>Nombre</TableCell>
                    <TableCell className={classes.strong}>Apellido</TableCell>
                    <TableCell className={classes.strong}>Email</TableCell>
                    <TableCell className={classes.strong}>GitHub</TableCell>
                    <TableCell className={classes.strong}>LinkedIn</TableCell>
                    <TableCell className={classes.strong}>Estado</TableCell>
                    {user.admin &&
                    <TableCell>Rol</TableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {(usuarios && filter && privacyData) && usuarios.map((usuario,index)=>
                <>
                {(index && filter &&
                !((filter.nombre==="" || !filter.nombre) &&
                    (filter.apellido==="" || !filter.apellido) && 
                    (filter.cohorte==="" || !filter.cohorte)) &&
                (!filter.nombre ||isPartOf(usuario.name, filter.nombre)) &&
                (!filter.apellido || isPartOf(usuario.lastName, filter.apellido)) 
                &&
                (!filter.cohorte || findCohorte(usuario.id)===filter.cohorte)
                )?
                <TableRow key={index}>
                    <TableCell>
                        {usuario.name}
                    </TableCell>
                    <TableCell>
                        {usuario.lastName}
                    </TableCell>
                    <TableCell>
                        {accessControl(usuario.id,"emailP")?(usuario.email):null}
                    </TableCell>
                    <TableCell>
                        {accessControl(usuario.id,"gitHub") &&
                        <a href={`https://github.com/${usuario.gitHubId}`} target="_blank">
                        <Button variant="outlined">{usuario.gitHubId}</Button></a>}
                    </TableCell>
                    <TableCell>
                        {accessControl(usuario.id,"linkedIn")&&
                        <a href={usuario.googleId} target="_blank">
                            <Button variant="outlined">
                                {usuario.googleId && usuario.googleId!=="empty"?"Ir":""}
                            </Button></a>}
                    </TableCell>
                    <TableCell>
                        {accessControl(usuario.id,"onLineStatus") && <Circle state="on"/>}
                    </TableCell>
                    {(user.admin && usuario) &&
                    <TableCell>
                        <RoleChange user={usuario} token={token}/>
                    </TableCell>}
                    </TableRow>
                    :null}
                    </>)}
            </TableBody>
        </Table>
            }
        </Paper>  
    )
}