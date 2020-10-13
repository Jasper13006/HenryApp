import React, {useState,useEffect}from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import EditIcon from '@material-ui/icons/Edit'
import { DialogTitle, FormControl } from '@material-ui/core'
import ImageUploader from 'react-images-upload'
import { makeStyles } from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import { changeUserImage} from '../../redux/actions/user'
import {update} from '../../redux/actions/update'
import './Perfil.css'

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
  instructions:{
    textAlign:'center',
    display:'flex',
    justifyContent:'center',
    marginTop: '0px',
  },
}));

export default function ImageDialog({user}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState(null)
  const dispatch=useDispatch()
  
  const token=localStorage.getItem('token')

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const filesHandler = function (files) {
    setFiles(files)
  }

  const uploadImage = async () => {
    let formData = new FormData();
    if (files && files.length > 0) {
        formData.append('photo', files[0]);
      }
    dispatch(changeUserImage(formData,user.id,token))
  }

  const handleSubmit=(e)=>{
    uploadImage()
    handleClose()
    setTimeout(()=>{
      dispatch(update())
    },10000)
  }

  return (
    <div className="editPhotoIcon">
      <EditIcon  onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.root} >
      <FormControl>
        <DialogContent>
          <DialogTitle>Editar Imagen de Perfil</DialogTitle>
          <p className={classes.instructions}>jpg | jpeg | png </p>
          <ImageUploader
              className={classes.upload}
              withIcon={false}
              label='Máximo: 5MB'
              fileSizeError='El archivo que intenta subir excede los 5MB'
              fileTypeError='Extensión no permitida'
              buttonText='Subir imagen'
              onChange={filesHandler}
              singleImage={true}
              imgExtension={['.jpg', '.jpeg', '.png', '.PNG']}
              maxFileSize={52428800}
              withPreview={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="inherit" variant="outlined">
            Actualizar
          </Button>
        </DialogActions>
        </FormControl>
      </Dialog>
    </div>
  );
}