import React,{useEffect,useState} from 'react'
import './Perfil.css'
import {useSelector,useDispatch} from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import ImageDialog from './ImageDialog'
import LocationDialog from './LocationDialog'
import SocialNetworkDialog from './SocialNetworkDialog'
import PasswordForm from './PasswordForm'
import axios from 'axios'

const useStyles = makeStyles(() => ({
    root: {
        borderRadius: '0px',
        display: 'flex',
        flexDirection: 'column',
        padding:'20px',
        width: '100%',
        margin:'auto',
    },
    card:{
        backgroundColor:'rgba(0,0,0,0.1)',
    },
    paper:{
        width:'90%',
        display:'flex',
        flexDirection:'row',
        margin:'auto',
        padding:'5%',
        borderRadius:'0px',
        backgroundColor:'rgb(234,259,241)',
    },
    paperInfo:{
        display:'flex',
        flexDirection:'column',
        width:'60%',
        textAlign:'center',
    },
    paperProfilePhoto:{
        width:'30%',
        marginLeft:'auto',
    },
    userImg:{
        width:'100%',
        borderRadius:'4px',
    },
    addInfoButton:{
        backgroundColor:'yellow',
        color:'black',
        '&:hover': {
            backgroundColor: 'black',
            color: 'yellow'
        }
    },
    passwordForm:{
        margin:'auto',
        maxWidth:'800px',
        textAlign:'center',
        padding: '20px',
    },
}));

export default function Perfil(){
    const classes = useStyles();
    const [usuario,setUsuario] =useState(null)
    const option=useSelector(state=>state.panel.data)
    const update=useSelector(state=>state.update)
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("idUser")
    
    useEffect(()=>{
        if(id && token){
            axios({
                method: 'GET',
                url: `http://localhost:3001/user/${id}`,
                credentials: 'include',
                headers: {"auth-token": token}
            }).then(res => {
                setUsuario(res.data)
                console.log(res.data)
            }).catch(err=> console.log(err))
        }
    },[update])

    const formatString =(string)=>{
        if(string){
            let arr = string.split("")
            arr[0]=arr[0].toUpperCase()
            let noSpaces=arr.join("")
            return(noSpaces)
            }
        return("")
        
    }

    return (
        <div>
        {!option?
            <div className={classes.root}>
            {usuario && 
                <Paper className={classes.paper} elevation={2}>
                    <div className={classes.paperInfo}>
                        <Typography variant="h4" component="h1">{usuario.name+" "+usuario.lastName}</Typography>
                        <table className="infoTable">
                            <tbody>
                            <tr><td>Ubicación</td><td className="display-flex">{usuario.city+", "+usuario.country}
                            <LocationDialog user={usuario} formatString={formatString}/>
                                </td>
                            </tr>
                            <tr><td>Email</td><td>{usuario.email}</td></tr>
                            <tr><td>Rol</td><td>
                                {usuario.student && "Estudiante"}
                                {usuario.pm && "PM"}
                                {usuario.instructor && "Instructor"}
                                </td></tr>
                            <tr><td>GitHub</td><td>
                                <SocialNetworkDialog red="GitHub"/>
                                </td>
                            </tr>
                            <tr><td>LinkedIn</td><td>
                                <SocialNetworkDialog red="LinkedIn"/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={classes.paperProfilePhoto}>
                        <Card className={classes.card}>
                            <img src={usuario.image} className={classes.userImg} alt="userImage"/>
                            <ImageDialog user={usuario} formatString={formatString}/>
                        </Card>
                    </div>
                </Paper>}
            </div>
        :null}
        {option===1 && usuario &&
        <PasswordForm token={token} id={usuario.id}/>
        }
        </div>
    )
}