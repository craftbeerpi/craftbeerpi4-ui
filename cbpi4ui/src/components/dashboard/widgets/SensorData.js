import { default as React } from "react";
import SensorValue from "../../util/SensorValue";
import { useDraggable, useModel } from "../DashboardContext";
import { useSensor, useSensorType, useCBPi } from "../../data";
import { ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, List, ListItem, ListItemText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useMemo, useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { sensorapi } from "../../data/sensorapi";
import PropsEdit from "../../util/PropsEdit";

const ButtonActionPropsDialog = ({ action = {}, config, open, onClose, onSubmit }) => {
  const [props, setProps] = useState({});

  const onChangeProps = (name, value) => {
    setProps({ ...props, [name]: value });
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle id="simple-dialog-title">{action.label}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container spacing={3}>
            <PropsEdit config={action.parameters} onChange={onChangeProps} props={props} />
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="secondary" autoFocus>
          Close
        </Button>
        <Button onClick={() => onSubmit(props)} variant="contained" color="Primary" autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const SensorActionDialog = ({ open, onClose, model, sensor }) => {
  const type = useSensorType(sensor.type);
  const { sensor: sensorid } = model.props;

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{model.name}</DialogTitle>
      <List>
        {type.actions.map((action, index) => (
          <ActionButton sensorid={sensorid} action={action} key={index} />
        ))}
        <ListItem button color="secondary">
          <ListItemText primary="Close" onClick={onClose} />
        </ListItem>
      </List>
    </Dialog>
  );
};

const ActionButton = ({ action, sensorid }) => {
  const [open, setOpen] = useState(false);
  const handle_action = (id, action) => {
    sensorapi.action(id, action.method, {});
  };

  const handleClose = () => setOpen(false);
  const handle_submit = (props) => {
      sensorapi.action(sensorid, action.method, props);
      setOpen(false)          
  };

  if (action.parameters.length > 0) {
    return (
      <>
        <ListItem button>
          <ListItemText primary={action.label} onClick={() => setOpen(true)} />
        </ListItem>
        <ButtonActionPropsDialog open={open} action={action} onSubmit={handle_submit} onClose={handleClose}/>
      </>
    );
  } else {
    return (
      <ListItem button  onClick={() => handle_action(sensorid, action)}>
        <ListItemText primary={action.label}   />
      </ListItem>
    );
  }
};

export const SensorData = ({ id }) => {
    const cbpi = useCBPi();
    const model = useModel(id);
    const draggable = useDraggable();
    const [open, setOpen] = useState(false);
    const sensor_id = model?.props?.sensor;
    const sensor_digits = model?.props?.digits;
    //const action = model?.props?.action;
    const sensor = useSensor(model.props?.sensor);
    const { sensor: sensorid, action } = model.props;

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const css_style = { color: model?.props?.color || "#fff", fontSize: `${model?.props?.size}px` };
    if (!action || action === "no") {
    return sensor_id ? (<div style={css_style}><SensorValue id={sensor_id} digits={sensor_digits} />{model.props?.unit}</div>) : "MISSING CONFIG";
    }
    else {
      return sensor_id ? (<div style={css_style}><SensorValue id={sensor_id} digits={sensor_digits} />{model.props?.unit}
                          <Button disabled={draggable} onClick={handleOpen} color="primary" size="small" aria-label="select merge strategy" aria-haspopup="menu">
                          <MoreVertIcon />
                          </Button>
                          <SensorActionDialog open={open} onClose={handleClose} model={model} sensor={sensor} />
                         </div>) : "MISSING CONFIG";
    };
  };