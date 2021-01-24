import { Paper } from "@material-ui/core";
import { useContext } from "react";
import Plot from "react-plotly.js";
import { DashboardContext } from "../DashboardContext";

const Chart = ({id}) => {
    const { state, actions } = useContext(DashboardContext);

    const model = actions.get_data(id);

    return <Paper><Plot
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
      width: model.props?.width || 200,
      height: model.props?.height || 200,
      margin: {
        l: 10,
        r: 5,
        b: 10,
        t: 5,
        pad: 1,
      },
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1,
        font: {
          family: 'sans-serif',
          size: 8,
          color: '#fff'
        },
      },
      xaxis: {
        showgrid: false,
        tickfont : {
          size : 8,
          color : '#fff'
        }
      },
      yaxis: {
        showgrid: true,
        tickfont : {
          size : 8,
          color : '#fff'
        }
      }
    }}
  /></Paper>
}

export default Chart