import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Paper, Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import ForgetPassForm from './ForgetPassForm'

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: "#000000",
        width: '100%',
        height: '100%',
        background: 'url(https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)',
        display: 'flex',
        marginTop: 0,    
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
      if (!usuario){swal('Error','Cuenta inexistente','error'); return} 
      await fetch(`http://localhost:3001/user/reset_password`, {
        method: 'POST',
        body: JSON.stringify({ email: values.email }),
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
      }).then(
          res => {
              if (res.message){
                swal('Error','mail no enviado','error')
             }else{swal('Success','mail no enviado','success')}            
            
        })
      resetForm()
      history.push('/login')
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
        <>
        <CssBaseline />
        <Paper className={classes.paper}>
          <ForgetPassForm/>
        </Paper>
        </>
    )
}