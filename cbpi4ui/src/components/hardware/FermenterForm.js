import { Breadcrumbs, Divider, Link, Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCBPi } from "../data";
import ActorSelect from "../util/ActorSelect";
import FermenterLogicSelect from "../util/FermenterLogicSelect";
import PropsEdit from "../util/PropsEdit";
import SensorSelect from "../util/SensorSelect";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const FermenterForm = () => {
  
  const history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const { id } = useParams();
  const [brewname, setBrewname] = useState("");
  const [target_temp, setTargettemp] = useState("");
  const [target_pressure, setTargetpressure] = useState("");
  const [heater, setHeater] = useState("");
  const [cooler, setCooler] = useState("");
  const [valve, setValve] = useState("");
  const [sensor, setSensor] = useState("");
  const [pressure_sensor, setPressure_Sensor] = useState("");
  const { fermenter, state, actions } = useCBPi();
  const [propsConfig, setPropsConfig] = useState(null);
  const [props, setProps] = useState({});

  const save = () => {
    const data = {
      name,
      brewname,
      target_temp,
      target_pressure,
      sensor,
      pressure_sensor,
      heater,
      cooler,
      valve,
      type,
      props,
    };

    if (id) {
      actions.update_fermenter(id, data, () => history.push("/hardware"));
    } else {
      actions.add_fermenter(data, () => history.push("/hardware"));
    }
  };

  useEffect(() => {
    if (id) {
      const item = fermenter.find((item) => item.id === id);
      if (item) {
        setName(item.name);
        setBrewname(item.brewname);
        setTargettemp(item.target_temp);
        setTargetpressure(item.target_pressure);
        setHeater(item.heater);
        setCooler(item.cooler);
        setValve(item.valve);
        setType(item.type);
        setSensor(item.sensor);
        setPressure_Sensor(item.pressure_sensor);
        setProps(item.props);
        if (item.type) {
          setPropsConfig(state.fermenterlogic.find((i) => i.name === item.type)?.properties);
        }
      }
    }
  }, []);

  const onChangeProps = (name, value) => {
    setProps({ ...props, [name]: value });
  };

  const onChangeType = (e) =>  {
    const value = e.target.value
    setType(value)
    if (value) {
      setPropsConfig(state.fermenterlogic.find((i) => i.name === value)?.properties);
    }
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Fermenter Config
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          onClick={() => {
            history.push("/hardware");
          }}
        >
          Fermenter
        </Link>
        <Typography color="textPrimary">{name}</Typography>
      </Breadcrumbs>

      <Divider />
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField required id="name" label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <FermenterLogicSelect value={type} onChange={onChangeType} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ActorSelect label="Heater" value={heater} onChange={(e) => setHeater(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ActorSelect label="Cooler" value={cooler} onChange={(e) => setCooler(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ActorSelect label="Valve" value={valve} onChange={(e) => setValve(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SensorSelect label="Temp Sensor" value={sensor} onChange={(e) => setSensor(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SensorSelect label="Pressure Sensor" value={pressure_sensor} onChange={(e) => setPressure_Sensor(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="BrewName" fullWidth value={brewname} onChange={(e) => setBrewname(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField type="number" label="TargetTemp" fullWidth value={target_temp} onChange={(e) => setTargettemp(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField type="number" label="TargetPressure" fullWidth value={target_pressure} onChange={(e) => setTargetpressure(e.target.value)} />
          </Grid>
          <PropsEdit config={propsConfig} data={props} onChange={onChangeProps} />
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push("/hardware");
            }}
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              save();
            }}
            className={classes.button}
          >
            Save
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default FermenterForm;
