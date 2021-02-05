import { Button, List } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CachedIcon from "@material-ui/icons/Cached";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { default as React, useContext, useEffect, useState } from "react";
import { useCBPi } from "../../data";
import MashControl from "../../util/MashControl";
import { DashboardContext, useDraggable, useModel } from "../DashboardContext";

const StepProps = ({ config, data }) => {
  if (!config) {
    return <></>;
  }

  return config.map((e) => (
    <div>
      {e.label} {data[e.label]}
    </div>
  ));
};

function SimpleDialog(props) {
  const { state } = useCBPi();
  const { onClose, selectedValue, open, item } = props;
  const [actions, setActions] = useState([]);
  const [type, setType] = React.useState({});

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    const t = state.stepTypes.find((e) => e.name === item.type);
    setType(t, {});
    setActions(t?.actions || []);
  }, [state.stepTypes]);

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Step Actions - {item.name}</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <StepProps config={type.properties} data={item.props} />
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

const State = ({ state }) => {
  switch (state) {
    case "I":
      return <RadioButtonUncheckedIcon />;
    case "A":
      return <CachedIcon color="primary" />;
    case "E":
      return <ErrorIcon />;
    case "D":
      return <CheckCircleIcon color="primary" />;
    case "P":
      return <PauseCircleOutlineIcon />;
    default:
      return "";
  }
};

const StepItem = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("emails");
  const draggable = useDraggable();

  const handleClickOpen = () => {
    console.log("############", draggable);
    if (draggable) {
      return;
    }
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <ListItem button={!draggable} onClick={handleClickOpen}>
        <ListItemIcon>
          <State state={item.status} />
        </ListItemIcon>
        <ListItemText primary={item.name} secondary={item.state_text} />
      </ListItem>
      <SimpleDialog item={item} selectedValue={selectedValue} open={open} onClose={handleClose} />
    </>
  );
};

export const Steps = ({ id }) => {
  const { state: state2, actions } = useContext(DashboardContext);

  const model = useModel(id)
  const { state } = useCBPi();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    setProfile(state.mashProfile);
  }, [state.mashProfile]);

  let inputStyle = { color: "#fff", width: `${model?.props?.width}px`, fontSize: 12, backgroundColor: "#2c282e", padding: 5, borderRadius: 5 };

  return (
    <div className="box" style={inputStyle}>
      <div style={{ marign: 20 }}>
        <div className="section_header">{state.mashBasic?.name}</div>
        <MashControl disabled={state2.draggable} />
        <List component="nav" aria-label="main mailbox folders">
          {profile.map((row, index) => (
            <StepItem item={row} key={index} />
          ))}
        </List>
      </div>
    </div>
  );
};

export default Steps;
