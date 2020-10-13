import React, {useState}from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import EditIcon from '@material-ui/icons/Edit'
import { DialogTitle, FormControl, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import { changeUserData } from '../../redux/actions/user'
import {update} from '../../redux/actions/update'
import './Perfil.css'

const useStyles = makeStyles(() => ({
  root: {
      padding:'30px',
      marginLeft:'30%',
      display:'flex',
  },
  upload:{
    width: '80%',
    margin: 'auto',
  },
}));

export default function LocationDialog({user,formatString}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [inputs,setInputs] =useState(null)
  const dispatch=useDispatch()
 
  const token=localStorage.getItem('token')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange=(e)=>{
    setInputs({
      ...inputs,
            [e.target.name]: e.target.value,
    })
  }

  const handleSubmit=(e)=>{
    let data={}
    data.city=inputs.city
    data.country=inputs.country
    dispatch(changeUserData(data,user.id,token))
    setTimeout(()=>{
      dispatch(update())
    },2000)
    handleClose()
  }

  return (
    <div>
      <EditIcon className="editIcon" onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.root}>
      <FormControl onChange={handleInputChange}>
        <DialogContent>
            <DialogTitle>Editar Información Personal</DialogTitle>
              <TextField 
                label="Ciudad"
                variant="outlined"
                name="city"
                value={inputs && inputs.city}
                defaultValue={formatString(user.city)}
              />
              <TextField 
                label="Pais" 
                variant="outlined"
                name="country"
                value={inputs && inputs.country}
                defaultValue={formatString(user.country)}
              />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Actualizar
          </Button>
        </DialogActions>
        </FormControl>
      </Dialog>
    </div>
  );
}