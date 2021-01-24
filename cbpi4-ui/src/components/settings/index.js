import { Button, Container, Divider, IconButton, InputBase, InputLabel, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import { useCBPi, useConfig } from "../data";
import { configapi } from "../data/configapi";
import SearchIcon from "@material-ui/icons/Search";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { useAlert } from "../alert/AlertProvider";
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

const ConfigInput = ({ onChange, value, options }) => {
  if (options) {
    return <SelectBox options={options} value={value} onChange={onChange} />;
  } else {
    return <TextField onChange={onChange} value={value} />;
  }
};

const Settings = () => {
  const {config: state } = useCBPi();
  const [config, setConfig] = useState({});

  const [filter, setFilter] = useState("");
  const classes = useStyles();
  const alert = useAlert()
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

    alert.show("Config saved")
  };

  const reset = () => {
    setConfig({ ...state });
    alert.show("Changes resetted")
  };

  let data = config;

  console.log("DATA", data);

  if (filter) {
    //data = data.filter((item) => item.name.includes(filter));
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
        
          <Button variant="contained" color="secondary" startIcon={<RotateLeftIcon />} onClick={reset}>
            Reset
          </Button>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={save}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Divider style={{ marginBottom: 10, marginTop: 10 }} />
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
                  <ConfigInput onChange={(e) => onChange(key, e)} value={config[key].value} options={config[key].options} />
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
