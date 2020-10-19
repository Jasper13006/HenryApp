import React, {useState,useEffect}from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import EditIcon from '@material-ui/icons/Edit'
import { DialogTitle, FormControl, CircularProgress } from '@material-ui/core'
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
  const [progress,setProgress] = useState(10)
  const [displayProgress,setDisplayProgress] = useState(false)
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

  useEffect(()=>{
    const timer = setInterval(()=>{
      setProgress((prev)=>(prev>=100?10:prev+10))
    },800)
    return ()=>{
      clearInterval(timer)
    }
  },[])
  

  const uploadImage = async () => {
    let formData = new FormData();
    if (files && files.length > 0) {
        formData.append('photo', files[0]);
      }
    dispatch(changeUserImage(formData,user.id,token))
    setDisplayProgress(true)
    setTimeout(()=>{
      setDisplayProgress(false)
    },5000)
  }

  const handleSubmit=(e)=>{
    uploadImage()
    setTimeout(()=>{
      dispatch(update())
    },10000)
    handleClose()
  }

  return (
    <div className="editPhotoIcon">
      {displayProgress &&
      <CircularProgress value={progress}/>}
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
          </Button >
        </DialogActions>
        </FormControl>
      </Dialog>
    </div>
  );
}