import { Slider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import React, { useContext, useMemo } from "react";
import { useCBPi, useKettle } from "../../data";
import { useActor } from "../../data/index";
import { DashboardContext, useModel } from "../DashboardContext";



const TargetTempDialog = ({ onClose, kettle, open }) => {
  const [value, setValue] = React.useState(30);

  const {actions} = useCBPi()

  if (!kettle) return "";

  const handleClose = () => {
    onClose();
  };

  const handleSet = () => {
    actions.target_temp_kettle(kettle.id, value)
    onClose();
  };

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const marks = [
    {
      value: 0,
      label: "0°",
    },
    {
      value: 20,
      label: "20°",
    },
    {
      value: 37,
      label: "37°",
    },
    {
      value: 100,
      label: "100°",
    },
  ];

  return (
    <Dialog fullWidth onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set Target Temp {kettle.name} </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h2" component="h2" gutterBottom>
              {value}°
            </Typography>
          </div>
          <Slider marks={marks} value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button variant="contained" onClick={handleClose} color="secondary" autoFocus>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSet} color="primary" autoFocus
              >
              Set
            </Button>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export const KettleControl = ({ id }) => {
  const { state } = useContext(DashboardContext);
  const [open, setOpen] = React.useState(false);
  const model = useModel(id);
  const cbpi = useCBPi();
  const kettle = useKettle(model.props?.kettle);
  const heater = useActor(kettle?.heater);
  const agitator = useActor(kettle?.agitator);
  const toggle = (id) => {
    cbpi.actions.toggle_actor(id);
  };
  const toggle_kettle_logic = (id) => {
    cbpi.actions.toggle_logic(id);
  };

  return useMemo(() => {
    const orientation = model?.props?.orientation === "horizontal" ? "horizontal" : "vertical";
    return (
      <>
        <ButtonGroup disabled={state.draggable || !model.props.kettle} orientation={orientation} color="primary" aria-label="contained primary button group">
          {heater ? <Button variant={heater?.state ? "contained" : ""} color="primary" startIcon={<WhatshotIcon />} onClick={() => toggle(kettle?.heater)}></Button>: ""}
          {agitator ? <Button variant={agitator?.state ? "contained" : ""} color="primary" startIcon={<CachedIcon />} onClick={() => toggle(kettle?.agitator)}></Button> : ""}
          {kettle?.type ? <Button variant={kettle?.state?.running ? "contained" : ""} color="primary" startIcon={<DriveEtaIcon />} onClick={() => toggle_kettle_logic(kettle?.id)}></Button> : ""}
          <Button variant="" color="primary" onClick={() => setOpen(true)} startIcon={<TrackChangesIcon />}></Button>
        </ButtonGroup>
        <TargetTempDialog open={open} kettle={kettle} onClose={() => setOpen(false)} />
      </>
    );
  }, [state.draggable, kettle, model.props.orientation, agitator, heater, open]);
};
