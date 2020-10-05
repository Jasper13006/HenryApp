import React, {useState}from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import EditIcon from '@material-ui/icons/Edit';
import { DialogTitle, IconButton, TextField } from '@material-ui/core';
import ImageUploader from 'react-images-upload';
import { makeStyles } from '@material-ui/core/styles';

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filesHandler = function (files) {
    setFiles(files)
  };


  if(files){
    console.log(files[0].name)
  }
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.root}>
        <DialogContent>
          <DialogTitle>Editar Información Personal</DialogTitle>
          <TextField 
            label="Ciudad"
            variant="outlined"
            defaultValue={formatString(user.city)}
            />
          <TextField 
            label="Pais" 
            variant="outlined"
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
          <Button onClick={handleClose} color="primary">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}