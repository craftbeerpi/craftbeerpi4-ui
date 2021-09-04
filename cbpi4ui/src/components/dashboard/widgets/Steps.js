import { Button, ButtonGroup, Divider, Grid, List, Paper, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import CachedIcon from "@material-ui/icons/Cached";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { default as React, useContext, useEffect, useState } from "react";
import { useCBPi } from "../../data";
import { stepapi } from "../../data/stepapi";
import ActorName from "../../util/ActorName";
import KettleName from "../../util/KettleName";
import MashControl from "../../util/MashControl";
import PropsEdit from "../../util/PropsEdit";
import SensorName from "../../util/SensorName";
import { DashboardContext, useDraggable, useModel } from "../DashboardContext";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
}));

const StepProps = ({ config, data }) => {
  if (!config) {
    return <></>;
  }

  return config.map((e, index) => {
    switch (e.type) {
      case "actor":
        return (
          <Grid item xs={12} md={6} key={index}>
            <Typography variant="caption" display="block" gutterBottom>
              {e.label}{" "}
            </Typography>
            <ActorName id={data[e.label]} />
          </Grid>
        );
      case "sensor":
        return (
          <Grid item xs={12} md={6} key={index}>
            <Typography variant="caption" display="block" gutterBottom>
              {e.label}
            </Typography>
            <SensorName id={data[e.label]} />
          </Grid>
        );
      case "kettle":
        return (
          <Grid item xs={12} md={6} key={index}>
            <Typography variant="caption" display="block" gutterBottom>
              {e.label}{" "}
            </Typography>
            <KettleName id={data[e.label]} />
          </Grid>
        );

      default:
        return (
          <Grid item xs={12} md={6} key={index}>
            <Typography variant="caption" display="block" gutterBottom>
              {e.label}{" "}
            </Typography>
            {data[e.label]}
          </Grid>
        );
    }
  });
};

const StepActionDialog = ({ action, config, open, onClose, onSubmit }) => {
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

const StepActionButton = ({ item, action }) => {
  const [open, setOpen] = React.useState(false);

  const call_action = (id, action) => {
    if (action.parameters.length > 0) {
      setOpen(true);
    } else {
      stepapi.action(id, action.method, {});
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (props) => {
    setOpen(false);
    stepapi.action(item.id, action.method, props);
  };

  return (
    <>
      <Button startIcon={<PlayCircleFilledIcon />} variant="contained" color="primary" fullWidth onClick={() => call_action(item.id, action)}>
        {action.label}{" "}
      </Button>
      {action?.parameters ? <StepActionDialog action={action} open={open} onSubmit={handleSubmit} onClose={handleClose} /> : null}
    </>
  );
};

const StepActionList = ({ type, item }) => {
  return (
    <ButtonGroup fullWidth orientation="vertical">
      {type.actions.map((action) => (
        <StepActionButton item={item} action={action} />
      ))}
    </ButtonGroup>
  );
};

function StepDetailsDialog(props) {
  const { state } = useCBPi();
  const { onClose, selectedValue, open, item } = props;
  const [actions, setActions] = useState([]);
  const [type, setType] = React.useState({});
  const classes = useStyles();
  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    const t = state.stepTypes.find((e) => e.name === item.type);
    setType(t, {});
    setActions(t?.actions || []);
  }, [state.stepTypes]);

  return (
    <Dialog fullWidth onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogContent>
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Parameter
          </Typography>
          <Grid container spacing={3}>
            <StepProps config={type.properties} data={item.props} />
          </Grid>
        </Paper>
        <Divider />
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Actions
          </Typography>
          <StepActionList item={item} type={type} />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary" autoFocus>
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
    case "S":
      return <PauseCircleOutlineIcon />;
    default:
      return "";
  }
};

const StepItem = ({ size, item }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("emails");
  const draggable = useDraggable();
  
  const handleClickOpen = () => {
    if (draggable) {
      return;
    }
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const primaryprops = {
    fontSize: (size -3 )+"pt"
 };
  const secondaryprops = {
    fontSize: size+"pt"
 };

  return (
    <>
      <ListItem button={!draggable} onClick={handleClickOpen}>
        <ListItemIcon>
          <State state={item.status} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ style: primaryprops }} primary={item.name} secondaryTypographyProps={{ style: secondaryprops }} secondary={item.state_text} />
      </ListItem>
      <StepDetailsDialog item={item} selectedValue={selectedValue} open={open} onClose={handleClose} />
    </>
  );
};

export const Steps = ({ id }) => {
  const { state: state2, actions } = useContext(DashboardContext);

  const model = useModel(id);
  const { state } = useCBPi();
  const [profile, setProfile] = useState([]);
  const history = useHistory();
  const draggable = useDraggable()


  useEffect(() => {
    setProfile(state.mashProfile);
  }, [state.mashProfile]);

  let inputStyle = { color: "#fff", width: `${model?.props?.width}px`,fontSize: `${model?.props?.namesize}pt`, backgroundColor: "#2c282e", padding: 5, borderRadius: 5 };

  if( draggable) {
    return <div className="box" style={{...inputStyle, display:"flex", justifyContent: "center", alignItems: "center"}}>
      <Typography variant="h6">Mash Steps</Typography>
    </div>
  }

  if (!state.mashBasic.name) {
    return (
      <div className="box" style={{...inputStyle, display:"flex", justifyContent: "center", alignItems: "center"}}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            history.push("/recipes");
          }}
          startIcon={<MenuBookIcon />}
        >
          Please select a Recipe
        </Button>
      </div>
    );
  }

  return (
    <div className="box" style={inputStyle}>
      <div style={{ marign: 20 }}>
        <div className="section_header">{state.mashBasic?.name}</div>
        <MashControl disabled={state2.draggable} />
        <List component="nav" aria-label="main mailbox folders">
          {profile.map((row, index) => (
            <StepItem size={model.props.stepsize} item={row} key={index} />
          ))}
        </List>
      </div>
    </div>
  );
};

export default Steps;
