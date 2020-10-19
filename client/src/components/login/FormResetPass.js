import React, {useState} from 'react';
import { useHistory, useParams} from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2';
import Footer from '../home/Footer'

const useStyles = makeStyles((theme) => ({ 
  paper: {      
    marginTop: theme.spacing(4),
    background: "white",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 0.7,
    padding: '10px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  danger: {
    color: 'red'
  },
  footer: {
      backgroundColor: 'yellow',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  }
}));

export default function FormResetPass() {
  const history = useHistory()
  const classes = useStyles();

  const [password,setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const {token} = useParams()

  
  const handleSubmit = async function (e) {
    e.preventDefault()
      await fetch(`http://localhost:3001/user/password/${token}`, {
        method: 'PUT',
        body: JSON.stringify({ password: password }),
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
      })
      .then(res=>{
          if (res.status == 400){
            Swal.fire("Error", "Link para cambiar contraseña expirado, recuerde contraseña nuevamente" , "error")
          }else if(res.status == 500) {
            Swal.fire("Error", "Error de servidor, pruebe más tarde" , "error")            
          }else{
            Swal.fire("Password cambiado con exito", "" , "success")
            history.push(`/login`)
          }
      })               
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Cambiar contraseña
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              { !password && (<p className={classes.danger}> Este campo es requerido </p>)}
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) => setconfirmPassword(e.target.value)}
                value={confirmPassword}
                name="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
              {!confirmPassword || confirmPassword !== password ? (<p className={classes.danger}> No coinciden las contraseñas </p>) : null}
              {!confirmPassword && (<p className={classes.danger}> Este campo es requerido </p>)}
            </Grid>
            
    
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!password || !confirmPassword || confirmPassword !== password || password.length < 8}
            className={classes.submit}
          >
            Cambiar contraseña
          </Button>
        </form>
      </div>
      <div className={classes.footer}>
       <Footer/> 
      </div>   
    </Container>
    
  );
}