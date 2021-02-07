import { Button, Divider, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../util/Header";
import ActorTable from "./ActorTable";
import KettleTable from "./KettleTable";
import SensorTable from "./SensorTable";

const useStyles = makeStyles((theme) => ({
  table: {},
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function Hardware() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Grid container direction="row" justify="space-between" alignItems="center" style={{ marginTop: 10 }}>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Hardware
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>

      <Divider style={{ marginBottom: 10, marginTop: 10 }} />
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Paper className={classes.paper}>
            <Header title="Kettle">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  history.push("/kettle");
                }}
              >
                ADD
              </Button>
            </Header>
            <KettleTable />
          </Paper>
        </Grid>
        <Grid item sm={12}>
          <Paper className={classes.paper}>
            <Header title="Sensor">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  history.push("/sensor");
                }}
              >
                ADD
              </Button>
            </Header>
            <SensorTable />
          </Paper>
        </Grid>
        <Grid item sm={12}>
          <Paper className={classes.paper}>
            <Header title="Actor">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  history.push("/actor");
                }}
              >
                ADD
              </Button>
            </Header>
            <ActorTable />
          </Paper>
        </Grid>
      </Grid>

      
     
    </>
  );
}
