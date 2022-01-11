import { Button, Divider, IconButton, InputBase, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useAlert } from "../alert/AlertProvider";
import { useCBPi } from "../data";
import { configapi } from "../data/configapi";
import SaveIcon from "@material-ui/icons/Save";
import ActorSelect from "../util/ActorSelect";
import KettleSelect from "../util/KettleSelect";
import FermenterSelect from "../util/FermenterSelect";
import SensorSelect from "../util/SensorSelect";
import StepTypeSelect from "../util/StepTypeSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const SelectBox = ({ options, value, onChange }) => {
  return (
    <>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value} onChange={onChange}>
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

const ConfigInput = ({ item, onChange, value, options }) => {

  switch (item.type) {
    case "select":
      return <SelectBox options={options} value={value} onChange={onChange} />
    case "kettle":
      return <KettleSelect value={value} onChange={onChange} label="" />;
    case "fermenter":
      return <FermenterSelect value={value} onChange={onChange} label="" />;
    case "sensor":
      return <SensorSelect value={value} onChange={onChange} label="" />;
    case "step":
      return <StepTypeSelect value={value} onChange={onChange} label="" />;
    case "actor":
      return <ActorSelect description={item.description} value={value} onChange={onChange} />;
    case "number":
      return <TextField onChange={onChange} value={value} />;
    default:
      return <TextField onChange={onChange} value={value} />;
  }



  
};

const Settings = () => {
  const { config: state } = useCBPi();
  const [config, setConfig] = useState({});

  const [filter, setFilter] = useState("");
  const classes = useStyles();
  const alert = useAlert();
  useEffect(() => {
    setConfig({ ...state });
  }, []);

  const onChange = (field, e) => {
    setConfig({ ...config, [field]: { ...config[field], changed: true, value: e.target.value } });
  };

  const save = () => {
    Object.keys(config).map((key) => {
      const parameter = config[key];
      if (parameter.changed) {
        configapi.update(key, parameter.value);
        setConfig((curret_config) => ({ ...curret_config, [key]: { ...curret_config[key], changed: false } }));
        
      }
    });
    
  };

  const shutdown = () => {
    configapi.shutdown();
  };

  const restart = () => {
    configapi.restart();
  };

  const reset = () => {
    setConfig({ ...state });
    
  };

  let data = config;

  if (filter) {
    data = Object.keys(data)
      .filter((key) => key.includes(filter))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
  }

  return (
    <>
      <Grid container direction="row" justify="space-between" alignItems="center" style={{ marginTop: 10 }}>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Settings
          </Typography>
        </Grid>
        <Grid item>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              placeholder="Filter"
              inputProps={{ "aria-label": "filter settings" }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item>
          <IconButton onClick={reset}>
          <RotateLeftIcon />
            </IconButton>
            <IconButton onClick={save}>
              <SaveIcon />
            </IconButton>
          
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Parameter</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((key) => (
              <TableRow key={key} selected={config[key].changed}>
                <TableCell component="th" scope="row">
                  {key}
                  <div>
                    <small>{config[key].description}</small>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <ConfigInput onChange={(e) => onChange(key, e)} item={config[key]} value={config[key].value} options={config[key].options} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Settings;
