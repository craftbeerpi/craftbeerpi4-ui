import { Divider, Grid, IconButton, Typography } from "@material-ui/core";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useState } from "react";
import Plot from "react-plotly.js";
import { useSensor } from "../data";
import { logapi } from "../data/logapi";
import DeleteDialog from "../util/DeleteDialog";

export const Charting = () => {
  const sensors = useSensor();
  const [formats, setFormats] = useState(() => []);
  const [data, setData] = useState([]);
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const load = () => {
    logapi.get2(formats, (d) => {
      const temp = [];
      
      for (const [key, value] of Object.entries(d)) {
        const senosr_config = sensors.find((item) => item.id === key);

        temp.push({
          x: value.time,
          y: value.value,
          name: senosr_config.name,
          type: "scatter",
          line: {
            width: 1,
          },
        });

        /*
[
            */
        console.log(`${key}: ${value}`);
      }
      setData(temp);
    });
  };
const clear_logs = () => {
  formats.map(format =>(
    logapi.clear(format)
  ));
  window.location.reload();
  };

  return (
    <>
      <Grid container direction="row" justify="space-between" alignItems="center" style={{ marginTop: 10 }}>
        <Grid item>
          <Typography variant="h5" gutterBottom>
          Analytics
          </Typography>
        </Grid>
      </Grid>
      <Divider style={{ marginBottom: 10, marginTop: 10 }} />
      <Grid container spacing={3}>
        <Grid item xs="12">
          <ToggleButtonGroup color="primary" value={formats} onChange={handleFormat} aria-label="text formatting">
            {sensors.map((item, index) => (
              <ToggleButton value={item.id} aria-label="bold">
                {item.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <IconButton onClick={load}>
            <AutorenewIcon />
          </IconButton>
          <DeleteDialog
            title="Delete logs"
            message="Do you want to delete the selected logs?"
            callback={clear_logs}
          />
        </Grid>
        <Grid item xs="12">
          <Plot
            data={data}
            config={{ displayModeBar: false }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: {
                text: "",
                font: {
                  family: "Advent Pro",
                  size: 12,
                  color: "#fff",
                },
              },
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              margin: {
                l: 20,
                r: 20,
                b: 20,
                t: 30,
                pad: 0,
              },
              legend: {
                x: 1,
                xanchor: "right",
                y: 1,
                font: {
                  family: "sans-serif",
                  size: 8,
                  color: "#fff",
                },
              },
              xaxis: {
                showgrid: false,
                tickfont: {
                  size: 8,
                  color: "#fff",
                },
              },
              yaxis: {
                showgrid: true,
                tickfont: {
                  size: 8,
                  color: "#fff",
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
