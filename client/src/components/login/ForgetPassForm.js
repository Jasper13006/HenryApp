import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
     paper: {
            // background: radial-gradient(circle, rgba(255,255,1,1) 43%, rgba(0,0,0,1) 100%);
            // backgroundImage:,
            // backgroundImage: './308300.jpg',
            background: "white",
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: 0.8
        },
      
     form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),            
            color: '#ffffff' 
        },
     submit: {
            margin: theme.spacing(3, 0, 2),
        },
    
      danger: {
        color: 'red'
      }
}));


export default function ForgetPass (){
    const classes = useStyles();
    const history = useHistory();
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
      email: '',
    });    
  
    const handleChange = (event) => {
      setErrors(validate({ ...values, [event.target.name]: event.target.value }))
      setValues({ ...values, [event.target.name]: event.target.value });
    };
  
    const resetForm = () => {
      setValues ({
          ...values,
          email: '',
      })   
    }
  
    const handleSubmit = async function (e) {
      e.preventDefault()
      const user = await fetch(`http://localhost:3001/user/email`, {
        method: 'POST',
        body: JSON.stringify({ email: values.email }),
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
      })
      const { usuario } = await user.json() 
      if (!usuario){
          swal.fire('Error','Cuenta inexistente','error');
          return
        } 
      swal.fire("Verifica tu correo electronico","Mail enviado","success")      
      await fetch(`http://localhost:3001/user/reset_password`, {
        method: 'POST',
        body: JSON.stringify({ email: values.email }),
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
      })     
     resetForm()
     history.push('/')        
    }  
  
    function validate(values) {
      let errors = {};
         if (!values.email  || values.email.length === 0) {
        errors.email = 'Email requerido';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email invalido';
      }    
      return errors
    }

    return (    
        <div className={classes.paper}>  
        <Typography component="h1" variant="h5" color="primary">
          Indica tu mail para cambiar contraseña
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>      
            <Grid item xs={12}>
              <TextField
                color="primary"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                value={values.email}
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                type="email"
              />
            </Grid>
            {errors.email && (<p className={classes.danger}>{errors.email}</p>)}
                   
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled= {!values.email || !/\S+@\S+\.\S+/.test(values.email)}
          >
            Resetear contraseña
          </Button>            
         
        </form>
        </div>   
        )
}