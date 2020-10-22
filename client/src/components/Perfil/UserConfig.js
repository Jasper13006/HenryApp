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

export default function UserConfig({token,id,user}){
    const classes= useStyles()
    const [privacy,setPrivacy] = useState(null)
    const [updater,setUpdater] = useState(0)
    const [privacyData,setPrivacyData]=useState(null)
    const [allPrivacy,setAllPrivacy] = useState(null)
    const [filter,setFilter] = useState(null)
    const usuarios = useSelector(state => state.students.data)
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
                // console.log(data)
                // console.log("ue1")
                setPrivacy(data.userPrivacy)
            }
        })
    },[updater])

    useEffect(()=>{
        // console.log(privacy)
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
                // console.log("ue2")
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
            // console.log("type: ",type, priv[type])
            // console.log("userId: ", userId)
            if(user.admin){
                // console.log("opcion 1")
                return(true) 
            }
            else if(user.instructor || user.pm){
                // console.log("opcion 2")
                if(priv[type]==="cohorte" || priv[type]==="todos"){
                    return(true)
                }
            }
            else if(user.student){
                // console.log("opcion 3")
                if(priv[type]==="todos"){
                    // console.log("esto otro")
                    return(true)
                } 
            }
            return(false)
        }
        // console.log("final")
        return(true)
    }

    // if(privacy){
    //     console.log("privacy: ", privacy)
    // }

    // if(usuarios){
    //     console.log("usuarios: ",usuarios)
    // }

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
                </TableRow>
            </TableHead>
            <TableBody>
                {(usuarios && filter && privacyData) && usuarios.map((usuario,index)=>
                <>
                {(index && filter &&
                !((filter.nombre==="" || !filter.nombre) &&
                    (filter.apellido==="" || !filter.apellido) && 
                    (filter.cohorte==="" || !filter.cohorte)) &&
                (!filter.nombre ||isPartOf(usuario.user.name, filter.nombre)) &&
                (!filter.apellido || isPartOf(usuario.user.lastName, filter.apellido)) &&
                (!filter.cohorte || (usuario.cohorteId).toString()===filter.cohorte)
                )?
                <TableRow key={index}>
                    <TableCell>
                        {usuario.user.name}
                    </TableCell>
                    <TableCell>
                        {usuario.user.lastName}
                    </TableCell>
                    <TableCell>
                        {accessControl(usuario.user.id,"emailP")?(usuario.user.email):null}
                    </TableCell>
                    <TableCell>
                        {accessControl(usuario.user.id,"gitHub") &&
                        <a href={`https://github.com/${usuario.user.gitHubId}`} target="_blank">
                        <Button variant="outlined">{usuario.user.gitHubId}</Button></a>}
                    </TableCell>
                    <TableCell>
                        {accessControl(usuario.user.id,"linkedIn")&&
                        <a href={usuario.user.googleId} target="_blank">
                            <Button variant="outlined">
                                {usuario.user.googleId && usuario.user.googleId!=="empty"?"Ir":""}
                            </Button></a>}
                    </TableCell>
                    <TableCell>
                        {accessControl(usuario.user.id,"onLineStatus") && <Circle state="on"/>}
                    </TableCell>
                    </TableRow>
                    :null}
                    </>)}
            </TableBody>
        </Table>
            }
        </Paper>  
    )
}