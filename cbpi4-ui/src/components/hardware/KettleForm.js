import { Breadcrumbs, Divider, Link, Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCBPi } from "../data";
import ActorSelect from "../util/ActorSelect";
import LogicSelect from "../util/LogicSelect";
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

const KettleForm = () => {
  
  const history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const { id } = useParams();
  const [heater, setHeater] = useState("");
  const [agitator, setAgitator] = useState("");
  const [sensor, setSensor] = useState("");
  const { kettle, state, actions } = useCBPi();
  const [propsConfig, setPropsConfig] = useState(null);
  const [props, setProps] = useState({});

  const save = () => {
    const data = {
      name,
      sensor,
      heater,
      agitator,
      type,
      props,
    };

    if (id) {
      actions.update_kettle(id, data, () => history.push("/hardware"));
    } else {
      actions.add_kettle(data, () => history.push("/hardware"));
    }
  };

  useEffect(() => {
    if (id) {
      const item = kettle.find((item) => item.id === id);
      if (item) {
        setName(item.name);
        setHeater(item.heater);
        setAgitator(item.agitator);
        setType(item.type);
        setSensor(item.sensor);
        setProps(item.props);
        if (item.type) {
          setPropsConfig(state.logic.find((i) => i.name === item.type)?.properties);
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
      setPropsConfig(state.logic.find((i) => i.name === value)?.properties);
    }
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Kettle Config
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          onClick={() => {
            history.push("/hardware");
          }}
        >
          Kettle
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
            <LogicSelect value={type} onChange={onChangeType} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ActorSelect label="Heater" value={heater} onChange={(e) => setHeater(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ActorSelect label="Agitator" value={agitator} onChange={(e) => setAgitator(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SensorSelect value={sensor} onChange={(e) => setSensor(e.target.value)} />
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

export default KettleForm;
