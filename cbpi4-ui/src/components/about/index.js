import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Plot from "react-plotly.js";
import logo from "../../images/cbpi.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const About = () => {
  const classes = useStyles();

  
  return (
    <div>
      <h1>ABOUT</h1>

      <Grid container spacing={2} className={classes.root}>
        <Grid item spacing={2} xs={12}>
          <Paper style={{ padding: 10 }}>
            This is CraftBeerPi Brewing Controller 4.0
            <p>It's an Open Source Project founded in 2015. More than 7,000 passioned Homebrewers and commercial Craft Brewerys are using CraftBeerPi. It's an open Eco System.</p>
            Website: http://www.CraftBeerPi.com <br />
            GitHub: http://github.com/manuel83 <br />
            Facebook: http://github.com/groups/craftbeerpi
            <br />
            <p>Cheers,</p>
            <p> Manuel Fritsch</p>
            <img width={30} src={logo} alt="Logo" /> CraftBeerPi
          </Paper>
        </Grid>
        <Grid item spacing={2} xs={12}>
          <Paper style={{ padding: 10 }}>
            <h3>Licnese</h3>
            <p>GNU General Public License 3</p>
          </Paper>
        </Grid>
      </Grid>
      <Paper>
        <Plot
          data={[
            {
              x: ["2021-10-04 21:23:00", "2021-10-04 22:23:00", "2021-10-04 23:23:00"],
              y: [1, 3, 6],
              type: "scatter",
            },
            {
              x: ["2021-10-04 21:23:00", "2021-10-04 22:23:00", "2021-10-04 23:23:00"],
              y: [2, 2, 1],
              type: "scatter",
            },
          ]}
          config={{ displayModeBar: false }}
          layout={{
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            width: "600",
            margin: {
              l: 50,
              r: 50,
              b: 100,
              t: 100,
              pad: 1,
            },
            legend: {
              font: {
                family: 'sans-serif',
                size: 12,
                color: '#000'
              },
            },
            xaxis: {
              showgrid: false,
              tickfont : {
                size : 8,
                color : 'red'
              }
            },
            yaxis: {
              showgrid: true,
              tickfont : {
                size : 8,
                color : 'red'
              }
            }
          }}
        />
      </Paper>
      
    </div>
  );
};

export default About;
