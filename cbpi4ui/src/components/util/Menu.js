import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BallotIcon from '@material-ui/icons/Ballot';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import InfoIcon from '@material-ui/icons/Info';
import PowerIcon from '@material-ui/icons/Power';
import SettingsIcon from '@material-ui/icons/Settings';
import TimelineIcon from '@material-ui/icons/Timeline';
import React from 'react';
import {

    useHistory
} from "react-router-dom";


const MenuItem = ({ onClose, label, path = "/", children }) => {
    const history = useHistory();

    const goTo = (key) => {
        history.push(key);
        onClose()
    }

    return <><ListItem button onClick={()=>goTo(path)}>
        <ListItemIcon>
            {children}
        </ListItemIcon>
        <ListItemText primary={label} />
     
    </ListItem>
    
    </>
}


const Menu = ({onClose}) => {
    return <List>
        <MenuItem onClose={onClose} label="Dashboard" ><DashboardIcon /></MenuItem>
        <MenuItem onClose={onClose} label="Mash Profile" path="/mashprofile"><BallotIcon /></MenuItem>
        <MenuItem onClose={onClose} label="Hardware" path="/hardware"><DeveloperBoardIcon /></MenuItem>
        <MenuItem onClose={onClose} label="Settings" path="/settings"><SettingsIcon /></MenuItem>
        <MenuItem onClose={onClose} label="Charting" path="/charting"><TimelineIcon /></MenuItem>
        <MenuItem onClose={onClose} label="Plugins" path="/plugins"><PowerIcon /></MenuItem>
        <MenuItem onClose={onClose} label="About" path="/about"><InfoIcon /></MenuItem>
    </List>
}

export default Menu

