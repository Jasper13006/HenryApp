import React from 'react';
import {Button,makeStyles} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root:{
    margin:'auto'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:'yellow',
    color:'black',
    '&:hover': {
        backgroundColor: 'black',
        color: 'yellow'
    }
    
  },
  
  input: {
    display: 'none',
  },
}));

export default function AlertDialogSlide({open,handleClose,progress}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{"Estamos enviando tus correos..."}</DialogTitle>
        <DialogContent style={{margin:'auto'}}>    
          <Box position="relative" display="inline-flex" >
            <CircularProgress variant="static" value={progress} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
                
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                progress,
                )}%`}</Typography>
            </Box>
          </Box>            
        </DialogContent>
        <DialogActions>
          {progress >= 100 && <Button onClick={handleClose} className={classes.submit}>
            Completado
          </Button>}   
        </DialogActions>
      </Dialog>
    </div>
  );
}