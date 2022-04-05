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
import SpeedIcon from '@mui/icons-material/Speed';
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useCBPi, useFermenter } from "../../data";
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


const TargetTempDialog = ({ onClose, fermenter, open }) => {
  let TEMP_UNIT = "TEMP_UNIT";
  const [value, setValue] = useState(30);
  const [checkunit, setCheckUnit] = useState(false);
  const [minval, setMinval] = useState(-5);
  const [maxval, setMaxval] = useState(40);
  const [marks, setMarks] = useState(
    [
      {
        value: -5,
        label: "-5°",
      },
            {
        value: 10,
        label: "10°",
      },
      {
        value: 20,
        label: "20°",
      },
      {
        value: 40,
        label: "40°",
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
      value: 70,
      label: "70°",
    },
    {
      value: 104,
      label: "104°",
    },
  ];

  const {actions} = useCBPi()
  useEffect(()=>{
    setValue(fermenter?.target_temp)
  },[])

  
  if (checkunit === false){
      configapi.getone(TEMP_UNIT, (data) => {
        if (data==="F"){
          setMinval(20);
          setMaxval(104);
          setMarks(marksF);
        }
        setCheckUnit(true);
        });
      };
    
  if (!fermenter) return "";

  const handleClose = () => {
    onClose();
  };

  const handleSet = () => {
    actions.target_temp_fermenter(fermenter.id, value)
    onClose();
  };

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog fullWidth onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set Target Temp {fermenter.name} </DialogTitle>
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

const TargetPressureDialog = ({ onClose, fermenter, open }) => {
  let PRESSURE_UNIT = "PRESSURE_UNIT";
  const [unit, setUnit] = useState("kPa");
  const [value, setValue] = useState(50);
  const [checkunit, setCheckUnit] = useState(false);
  const [minval, setMinval] = useState(0);
  const [maxval, setMaxval] = useState(400);
  const [stepwidth, setStepwidth] = useState(1);
  const [marks, setMarks] = useState(
    [
      {
        value: 0,
        label: "0",
      },
            {
        value: 100,
        label: "100",
      },
      {
        value: 200,
        label: "200",
      },
      {
        value: 300,
        label: "300",
      },
      {
        value: 400,
        label: "400",
      },
    ]
  );

  const marksPSI = [
          {
      value: 0,
      label: "0",
    },
    {
      value: 25,
      label: "25",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 75,
      label: "75",
    },

  ];

  const {actions} = useCBPi()
  useEffect(()=>{
    setValue(fermenter?.target_pressure)
  },[])

  
  if (checkunit === false){
      configapi.getone(PRESSURE_UNIT, (data) => {
        if (data==="PSI"){
          setUnit(data);
          setMinval(0);
          setMaxval(75);
          setMarks(marksPSI);
          setStepwidth(0.5);
        }
        setCheckUnit(true);
        });
      };
    
  if (!fermenter) return "";

  const handleClose = () => {
    onClose();
  };

  const handleSet = () => {
    actions.target_pressure_fermenter(fermenter.id, value)
    onClose();
  };

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog fullWidth onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set Target Pressure {fermenter.name} </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h2" component="h2" gutterBottom>
              {value} {unit}
            </Typography>
          </div>
          <Slider min={minval} max={maxval} marks={marks} step={stepwidth} value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
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

export const FermenterControl = ({ id }) => {
  const { state } = useContext(DashboardContext);
  const [open, setOpen] = React.useState(false);
  const [openp, setOpenp] = React.useState(false);
  const model = useModel(id);
  const cbpi = useCBPi();
  const fermenter = useFermenter(model.props?.fermenter);
  const heater = useActor(fermenter?.heater);
  const cooler = useActor(fermenter?.cooler);
  const valve = useActor(fermenter?.valve);
  const toggle = (id) => {
    cbpi.actions.toggle_actor(id);
  };
  const toggle_fermenter_logic = (id) => {
    cbpi.actions.toggle_logic_fermenter(id);
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
        <ButtonGroup size={size()} disabled={state.draggable || !model.props.fermenter} orientation={orientation} color="primary" aria-label="contained primary button group">
           {heater ? <Button variant={heater?.state ? "contained" : ""}  color="primary" startIcon={<WhatshotIcon />} onClick={() => toggle(fermenter?.heater)}></Button>: ""}
          {cooler ? <Button variant={cooler?.state ? "contained" : ""}  color="primary" startIcon={<AcUnitIcon />} onClick={() => toggle(fermenter?.cooler)}></Button> : ""}
          {fermenter?.type ? <Button variant={fermenter?.state ? "contained" : ""}  color="primary" startIcon={<DriveEtaIcon />} onClick={() => toggle_fermenter_logic(fermenter?.id)}></Button> : ""}
          <Button variant=""  color="primary" onClick={() => setOpen(true)} startIcon={<TrackChangesIcon />}></Button>
          {valve ? <Button variant=""  color="primary" onClick={() => setOpenp(true)} startIcon={<SpeedIcon />}></Button>: ""}
        </ButtonGroup>
        
      <TargetTempDialog open={open} fermenter={fermenter} onClose={() => setOpen(false)} />
      <TargetPressureDialog open={openp} fermenter={fermenter} onClose={() => setOpenp(false)} />
      </>
    );
  }, [state.draggable, fermenter, model.props.orientation, model.props.size, cooler, heater, valve, open, openp]);
};
