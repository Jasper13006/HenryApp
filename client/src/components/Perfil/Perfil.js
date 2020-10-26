import React, { useEffect, useState } from 'react'
import './Perfil.css'
import { useSelector, useDispatch } from 'react-redux'
import { FormControlLabel, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import ImageDialog from './ImageDialog'
import LocationDialog from './LocationDialog'
import SocialNetworkDialog from './SocialNetworkDialog'
import PasswordForm from './PasswordForm'
import axios from 'axios'
import GitHubDetails from './GitHubDetails'
import LinkedInDetails from './LinkedInDetails'
import Switch from '@material-ui/core/Switch'
import UserConfig from './UserConfig'
import {traerUsuarios} from '../../redux/actions/user'

const useStyles = makeStyles(() => ({
    root: {
        borderRadius: '0px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        width: '100%',
        margin: 'auto',
    },
    card: {
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    paper: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto',
        padding: '5%',
        borderRadius: '0px',
        backgroundColor: 'rgb(234,259,241)',
    },
    paperInfo: {
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
        textAlign: 'center',
    },
    paperProfilePhoto: {
        width: '30%',
        marginLeft: 'auto',
    },
    userImg: {
        width: '100%',
        borderRadius: '4px',
    },
    addInfoButton: {
        backgroundColor: 'yellow',
        color: 'black',
        '&:hover': {
            backgroundColor: 'black',
            color: 'yellow'
        }
    },
    passwordForm: {
        margin: 'auto',
        maxWidth: '800px',
        textAlign: 'center',
        padding: '20px',
    },
}));

export default function Perfil() {
    const classes = useStyles()
    const dispatch=useDispatch()
    const [usuario, setUsuario] = useState(null)
    const option = useSelector(state => state.panel.data)
    const update = useSelector(state => state.update)
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("idUser")
    const [check, setCheck] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (id && token) {
                await axios({
                    method: 'GET',
                    url: `http://localhost:3001/user/${id}`,
                    credentials: 'include',
                    headers: { "auth-token": token }
                }).then(res => {
                    setUsuario(res.data)
                }).catch(err => console.log(err))
            }
        }
        fetchData()
        dispatch(traerUsuarios())

    }, [update])

    const formatString = (string) => {
        if (string) {
            let arr = string.split("")
            arr[0] = arr[0].toUpperCase()
            let noSpaces = arr.join("")
            return (noSpaces)
        }
        return ("")
    }

    const handleSwitch = () => {
        setCheck(!check)
    }

    return (
        <div>
            {!option ?
                <div className={classes.root}>
                    {usuario &&
                        <Paper className={classes.paper} elevation={2}>
                            <div className={classes.paperInfo}>
                                <Typography variant="h4" component="h1">{usuario.name + " " + usuario.lastName}</Typography>
                                <table className="infoTable">
                                    <tbody>
                                        <tr><td>Ubicación</td><td className="display-flex">{usuario.city + ", " + usuario.country}
                                            <LocationDialog user={usuario} formatString={formatString} />
                                        </td>
                                        </tr>
                                        <tr><td>Email</td><td>{usuario.email}</td></tr>
                                        <tr><td>Rol</td><td>
                                            {usuario.student && "Estudiante" + ' '}
                                            {usuario.pm && "PM" + ' '}
                                            {usuario.instructor && "Instructor" + ' '}
                                        </td></tr>
                                        <tr><td>GitHub</td><td>
                                            {(usuario.gitHubId && usuario.gitHubId !== "empty") ?
                                                <GitHubDetails data={usuario.gitHubId} usuario={usuario} token={token} />
                                                : <SocialNetworkDialog red="GitHub" data={usuario.gitHubId} user={usuario} token={token} />}
                                        </td>
                                        </tr>
                                        <tr><td>LinkedIn</td><td>
                                            {(usuario.googleId && usuario.googleId !== "empty") ?
                                                <LinkedInDetails data={usuario.googleId} usuario={usuario} token={token} />
                                                : <SocialNetworkDialog red="LinkedIn" data={usuario.googleId} user={usuario} token={token} />}
                                        </td>
                                        </tr>
                                    </tbody>
                                </table><br />
                                <FormControlLabel
                                    control={<Switch checked={check} onChange={handleSwitch} name="checked" />}
                                    label={check ? "En línea" : "Desconectado"}
                                    color="primary">
                                </FormControlLabel>

                            </div>
                            <div className={classes.paperProfilePhoto}>
                                <Card className={classes.card}>
                                    <img src={usuario.image} className={classes.userImg} alt="userImage" />
                                    <ImageDialog user={usuario} formatString={formatString} />
                                </Card>
                            </div>
                        </Paper>}
                </div>
                : null}
            {option === 1 && usuario &&
                <PasswordForm token={token} id={usuario.id} />
            }
            {option === 2 && usuario &&
                <UserConfig token={token} id={usuario.id} user={usuario} />
            }
        </div>
    )
}