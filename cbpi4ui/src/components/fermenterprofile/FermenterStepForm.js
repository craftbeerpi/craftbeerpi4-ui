import { Breadcrumbs, Divider, Link, Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAlert } from "../alert/AlertProvider";
import { CBPiContext, useCBPi } from "../data";
import { fermenterapi } from "../data/fermenterapi";
import PropsEdit from "../util/PropsEdit";
import FermenterStepTypeSelct from "../util/FermenterStepTypeSelect";

const props = [
  {
    label: "Parameter1",
    type: "number",
    configurable: true,
    description: "",
    default_value: null,
  },
  {
    label: "Parameter2",
    type: "text",
    configurable: true,
    default_value: "HALLO",
    description: "",
  },
];

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

const FermenterStepForm = () => {
  const history = useHistory();
  const alert = useAlert();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [props, setProps] = useState({})
  const [propsConfig, setPropsConfig] = useState(null);
  const { id } = useParams();
  const { fermenterid } = useParams();
  const { state } = useCBPi();
  const {step, setStep} = useState({});
 
  const { actions } = useContext(CBPiContext);

  const save = () => {
    const data = {
      name,
      type,
      props,
    };

    if (id) {
      fermenterapi.updatestep(fermenterid, id, data, (data) => {
        //console.log("Test");
         });
         history.push("/fermenterprofile/"+fermenterid);
    } else {
      fermenterapi.addstep(fermenterid, data, (data) => {
        
        history.push("/fermenterprofile/"+fermenterid);
      });
    }
  };
  const onSelectType = (e) => {
    const name = e.target.value;
    setType(name);
    const type2 = state.stepTypesFermenter.find((item) => item.name === name);
    setPropsConfig(type2?.properties);
  };
  const onChangeProps = (name, value) => setProps({...props, [name]: value})


  useEffect(() => {
    if (id && fermenterid) {
      const fermentersteps = actions.get_fermentersteps_by_id(fermenterid)
      const k = fermentersteps.steps.find(item => item.id === id);

      if (k) {
        setName(k.name);
        setType(k.type);
        setProps(k.props)
        if (k.type) {
          setPropsConfig(state.stepTypesFermenter.find((item) => item.name === k.type)?.properties);
        }
      }
    }
  }, [state.fermenter]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Step Config
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          onClick={() => {
            history.push("/fermenterprofile/"+fermenterid);
          }}
        >
          Fermenter Profile
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
            <FermenterStepTypeSelct value={type} onChange={onSelectType} />
          </Grid>

          <PropsEdit config={propsConfig} data={props} onChange={onChangeProps} />
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push("/fermenterprofile/"+fermenterid);
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

export default FermenterStepForm;
