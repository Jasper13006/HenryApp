import React, {useState,useEffect}from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import EditIcon from '@material-ui/icons/Edit'
import { DialogTitle, FormControl, IconButton, TextField } from '@material-ui/core'
import ImageUploader from 'react-images-upload'
import { makeStyles } from '@material-ui/core/styles'
import {useDispatch, useSelector} from 'react-redux'
import {changeUserData} from '../../redux/actions/user'

const useStyles = makeStyles((theme) => ({
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

export default function ImageDialog({user,formatString}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState(null)
  const [inputs,setInputs] =useState(null)
  const dispatch=useDispatch()
  // const token=useSelector(state=>state.login.data)

  const token=localStorage.getItem('token')

  useEffect(()=>{
    console.log(inputs)
  },[inputs])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filesHandler = function (files) {
    setFiles(files)
  };

  const handleInputChange=(e)=>{
    setInputs({
      ...inputs,
            [e.target.name]: e.target.value,
    })
  }

  const handleSubmit=(e)=>{
    console.log("handleSubmit")
    let data={}
    data.city=inputs.city
    data.country=inputs.country
    console.log(data)
    dispatch(changeUserData(data,user.id,token))
    handleClose()
  }


  if(files){
    console.log(files[0].name)
  }
  if(token){
    console.log("token: ",token)
  }
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon/>
      </IconButton>
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
            defaultValue={formatString(user.country)}/>
        <ImageUploader
            className={classes.upload}
            withIcon={true}
            buttonText='Subir imagen'
            onChange={filesHandler}
            imgExtension={['.jpg', '.jpeg', '.png', '.PNG']}
            maxFileSize={52428800}
            withPreview={false}
          />
        {files && <p> {files[0].name}</p>}
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