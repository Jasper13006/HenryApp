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
  addInfoButton:{
    backgroundColor:'yellow',
    color:'black',
    '&:hover': {
        backgroundColor: 'black',
        color: 'yellow'
    },
    githubEdit:{
        display:'flex',
        flexDirection:'row',
    },
},
}));

export default function GitHubDialog({red}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [user,setUser] =useState(null)
  const [temporaryUser,setTemporaryUser] = useState(null)
  const dispatch=useDispatch()
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange=(e)=>{
    setTemporaryUser(e.target.value)
  }

  const handleSubmit=(e)=>{
    setUser(temporaryUser)
    handleClose()
  }

  return (
    <div>
    {user?
    <div className={classes.githubEdit}>
    {user}
    <EditIcon className="editIcon" onClick={handleClickOpen}/>
    </div>
      :<Button onClick={handleClickOpen} className={classes.addInfoButton} size="small">Agregar</Button>}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.root}>
      <FormControl>
        <DialogContent>
            <DialogTitle>Agregar Usuario de {red}</DialogTitle>
              <TextField 
                label={"Usuario de "+red}
                variant="outlined"
                name="github"
                onChange={handleInputChange}
                defaultValue={user}
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