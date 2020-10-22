import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import { FormControl, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import {changeUserData} from '../../redux/actions/user'

const useStyles = makeStyles(() => ({
    paper:{
        width:'40%',
        display:'flex',
        flexDirection:'row',
        marginTop:'20px',
        margin:'auto',
        padding:'10px',
        borderRadius:'0px',
        
    },
    passwordForm:{
        margin:'auto',
        maxWidth:'800px',
        textAlign:'center',
        padding: '20px',
    },
}));

export default function PasswordForm({token,id}){
    const classes = useStyles();
    const [errors,setErrors] = useState({})
    const dispatch=useDispatch()
    const [input,setInput] = useState({
        oldPassword:'',
        newPassword:'',
        repeatNewPassword:'',
    })

    const validate = (state) => {
        let errors = {};
        if (state.oldPassword==='') {
            errors.oldPassword = 'Debe introducir su contraseña actual';
        }
        if (state.newPassword==='') {
            errors.password = 'Se requiere una nueva contraseña'
        }
        if (state.repeatNewPassword!==state.newPassword){
            errors.repeatNewPassword = 'Las contraseñas no coinciden'
        }
        if(Object.keys(errors).length===0){
            return(null)
        }
        return errors;
    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (input.oldPassword && input.newPassword) {
            const data={password:input.oldPassword,newPassword:input.newPassword}
            dispatch(changeUserData(data,id,token))
            setInput({
                oldPassword:'',
                newPassword:'',
                repeatNewPassword:''})
        }
    }
    return(
        <Paper className={classes.paper}>
            <FormControl 
                className={classes.passwordForm} 
                onChange={handleInputChange}>
                <Typography component="h2" variant="h5">Cambiar contraseña</Typography><br/>
                    {errors?(<p style={{ color: "red" }}>{errors.oldPassword}</p>):<br/>}
                <TextField 
                    name="oldPassword"
                    type="password"
                    label="contraseña actual" 
                    variant="outlined"
                    margin="normal"
                    autoFocus
                    value={input.oldPassword}/>
                    {errors?(<p style={{ color: "red" }}>{errors.newPassword}</p>):<br/>}
                <TextField 
                    name="newPassword"
                    type="password"
                    label="nueva contraseña" 
                    variant="outlined"
                    value={input.newPassword}/>
                    {errors?(<p style={{ color: "red" }}>{errors.repeatNewPassword}</p>):<br/>}   
                <TextField 
                    name="repeatNewPassword"
                    type="password"
                    label="repita nueva contraseña" 
                    variant="outlined"
                    value={input.repeatNewPassword}/><br/>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={errors?true:false}>Enviar
                </Button><br/>
            </FormControl>
        </Paper>
    )
}



