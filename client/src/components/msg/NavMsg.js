import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',   
    
  },
  accordion:{
    backgroundColor: 'rgba(255, 255, 255, 0.7);',
    display:'flex',
    flexDirection:'column'
  },
  submit: {
    color:'black',
    margin: '-9px',
    '&:hover': {
        color: 'yellow',
        backgroundColor:'transparent'
    }
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    
  },
  list:{
    display:'flex',
    flexDirection:'column'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    position:'inherit'
  },
  headMsg:{
    display:'flex',
    alignItems:'baseline'
  }
  
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [userMsg,setUserMsg] = React.useState([])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    
    
  })

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} className={classes.accordion} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.headMsg}
        >
          <Typography className={classes.heading}>Mensajes Directos</Typography>
          <Link to ={`/panel/toMsg`}>
            <IconButton className={classes.submit} aria-label="add to shopping cart">
              <AddIcon />
            </IconButton>
          </Link>
          
        </AccordionSummary>
        <AccordionDetails>
          {userMsg.map((user,key)=>(
            <ListItem button type='submit'key={key}>
                <ListItemIcon>
                <div className={classes.list}>
                    <Avatar src={user.image} className={classes.small} />
                    </div>
                </ListItemIcon>
                <ListItemText primary={user.fullName} />
            </ListItem>
          ))} 
        </AccordionDetails>
      </Accordion>
    </div>
  );
}