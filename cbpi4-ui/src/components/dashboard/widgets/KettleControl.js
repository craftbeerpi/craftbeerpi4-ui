
import React, { useContext, useMemo } from "react";
import { useKettle, useCBPi} from "../../data";
import { DashboardContext } from "../DashboardContext";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import CachedIcon from '@material-ui/icons/Cached';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import {useActor} from '../../data/index'

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';


const TargetTempDialog = ({onClose, open}) => {

 
  
  
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title">Step Actions </DialogTitle>
    
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
            
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
        </Dialog>
      );
}


export const KettleControl = ({ id }) => {
    
    const { state, actions } = useContext(DashboardContext);
    const model = actions.get_data(id);
    const cbpi = useCBPi()
    const actors = useActor()
    const kettle = useKettle(model.props?.kettle)
    const [open, setOpen] = React.useState({});

    const toggle = (id) => {
          cbpi.actions.toggle_actor(id)
    }    

    return useMemo(() => {
        const orientation = model?.props?.orientation === 1 ? "horizontal" :"vertical"
        
        return <ButtonGroup disabled={state.draggable} orientation={orientation} color="primary" aria-label="contained primary button group">
        <Button
        variant="contained"
        color="secondary"
        startIcon={<WhatshotIcon />}
        onClick={()=>toggle(kettle.heater)}
        >
        </Button>
        <Button
        variant="contained"
        color="secondary"
        startIcon={<CachedIcon />}
        onClick={()=>toggle(kettle.agitator)}
        >
      
        </Button>
        <Button
        variant="contained"
        color="secondary"
        startIcon={<DriveEtaIcon />}>
        </Button>
        <Button
        variant="contained"
        color="secondary"
        startIcon={<TrackChangesIcon />}>
        </Button>
    </ButtonGroup>  

      }, [state.draggable, model.props.orientation, open])
  };
  
  /*
    

    

    console.log("RENDER ", kettle)

    
    
  */