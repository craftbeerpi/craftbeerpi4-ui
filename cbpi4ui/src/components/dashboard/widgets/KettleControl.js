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
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useCBPi, useKettle } from "../../data";
import { useActor } from "../../data/index";
import { DashboardContext, useModel } from "../DashboardContext";
import { configapi } from "../../data/configapi";
import { createTheme , ThemeProvider} from '@material-ui/core/styles';
import pink from "@material-ui/core/colors/pink";

const theme = createTheme({
  overrides: {
    palette:{
      type: 'dark',
    primary: {
      main: "#00FF00"
    },
    secondary: pink,
    },
    MuiButton: {
      outlinedPrimary:{
        color: "#00FF00",
        border: "1px solid #00FF00"
      },
      containedPrimary:{
        color: "#00FF00",
        backgroundColor: "#00FF00",
        '&:hover': {
          backgroundColor: "#00B200",
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: "#00FF00"
          }}
      },
      iconSizeSmall: {
        "& > *:first-child": {
          fontSize: 20
        }
      },
      iconSizeMedium: {
        "& > *:first-child": {
          fontSize: 25
        }
      },
      iconSizeLarge: {
        "& > *:first-child": {
          fontSize: 32
        }
      }
    },
  },
});


const TargetTempDialog = ({ onClose, kettle, open }) => {
  let TEMP_UNIT = "TEMP_UNIT";
  const [value, setValue] = useState(30);
  const [checkunit, setCheckUnit] = useState(false);
  const [minval, setMinval] = useState(-5);
  const [maxval, setMaxval] = useState(100);
  const [marks, setMarks] = useState(
    [
      {
        value: -5,
        label: "-5°",
      },
            {
        value: 20,
        label: "20°",
      },
      {
        value: 50,
        label: "50°",
      },
      {
        value: 100,
        label: "100°",
      },
    ]
  );

  const marksF = [
          {
      value: 20,
      label: "20°",
    },
    {
      value: 50,
      label: "50°",
    },
    {
      value: 100,
      label: "100°",
    },
    {
      value: 150,
      label: "150°",
    },
    {
      value: 212,
      label: "212°",
    },
  ];

  const {actions} = useCBPi()
  useEffect(()=>{
    setValue(kettle?.target_temp)
  },[])

  
  if (checkunit === false){
      configapi.getone(TEMP_UNIT, (data) => {
        if (data==="F"){
          setMinval(20);
          setMaxval(212);
          setMarks(marksF);
        }
        setCheckUnit(true);
        });
      };
    
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
          <Slider min={minval} max={maxval} marks={marks} step={1} value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
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
    const size = () => {
      if (model.props.size === "large") {
        return "large"
      }
      else if (model.props.size === "small") {
        return "small"
      }
      else { 
        return "medium"
      }
    };
    
    //console.log(kettle?.state, heater?.state  )
    return (
      <>
        <ButtonGroup size={size()} disabled={state.draggable || !model.props.kettle} orientation={orientation} color="primary" aria-label="contained primary button group">
           {heater ? <Button variant={heater?.state ? "contained" : ""}  color="primary" startIcon={<WhatshotIcon />} onClick={() => toggle(kettle?.heater)}></Button>: ""}
          {agitator ? <Button variant={agitator?.state ? "contained" : ""}  color="primary" startIcon={<CachedIcon />} onClick={() => toggle(kettle?.agitator)}></Button> : ""}
          {kettle?.type ? <Button variant={kettle?.state ? "contained" : ""}  color="primary" startIcon={<DriveEtaIcon />} onClick={() => toggle_kettle_logic(kettle?.id)}></Button> : ""}
          <Button variant=""  color="primary" onClick={() => setOpen(true)} startIcon={<TrackChangesIcon />}></Button>
        </ButtonGroup>
        
      <TargetTempDialog open={open} kettle={kettle} onClose={() => setOpen(false)} />
      </>
    );
  }, [state.draggable, kettle, model.props.orientation, model.props.size, agitator, heater, open]);
};
