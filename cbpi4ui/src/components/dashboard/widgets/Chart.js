import { ClickAwayListener, Dialog, DialogTitle, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Popper } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import { logapi } from "../../data/logapi";
import { useDraggable, useModel } from "../DashboardContext";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DeleteIcon from "@material-ui/icons/Delete";


const ContextMenu = ({ open, handleClose, doRefresh }) => {
  return <Dialog open={open} onClose={handleClose} aria-labelledby="simple-dialog-title">

<DialogTitle id="simple-dialog-title">Chart</DialogTitle>
      
  </Dialog>;
};

const Chart = ({ id }) => {
  const [data, setData] = useState([]);
  const model = useModel(id);
  const draggable = useDraggable();
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    load_data()
    const interval = setInterval(() => {
      load_data()
    }, (model.props?.refresh || 10) * 1000);
    return () => clearTimeout(interval);
  }, [model?.props?.sensor, model.props?.refresh, ]);

  const load_data = () => {

    const onSuccess = (data, id) => {
      setLoading(false)
      setData([
        {
          x: data.time,
          y: data[id],
          type: "scatter",
          line: {
            color: model?.props?.linecolor || "#00FF00",
            width: 1,
          },
        },
      ]);
    };
    if (model?.props?.sensor) {
      setLoading(true)
      logapi.get(model?.props?.sensor, onSuccess);
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const clear_data = () => {
    logapi.clear(model?.props?.sensor, ()=>setData([]))
  }

  if (draggable === true) {
    let css_style2 = {
      display: "flex",
      flexDirection: "column",
      fontSize: "20px",
      alignItems: "center",
      justifyContent: "center",
      width: `${model?.props?.width}px`,
      height: `${model?.props?.height}px`,
    };
    return (
      <div className="box" style={css_style2}>
        <div>Chart {model.name}</div>
        <div>{!model?.props?.sensor ? "Missing Config" : ""}</div>
      </div>
    );
  }

  if (!model?.props?.sensor) {
    return <div>Config Missing</div>;
  }

  return (
    <div className="box">
      {}
      <Plot
        data={data}
        config={{ displayModeBar: false }}
        layout={{
          title: {
            text: model.name,
            font: {
              family: "Advent Pro",
              size: 12,
              color: "#fff",
            },
          },
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          width: model.props?.width || 200,
          height: model.props?.height || 200,

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

      <IconButton  ref={anchorRef} onClick={()=>setOpen(true)} size="small" variant="contained" style={{ position: "absolute", top: 5, right: 10 }}>
        <MoreVertIcon />
      </IconButton>
      { loading ? <RotateLeftIcon fontSize="small" style={{ position: "absolute", bottom: 10, right: 10 }} />: ""}

      <Popper  open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>

      <ClickAwayListener onClickAway={handleClose}>
      <Paper>
      <List>
        <ListItem button color="secondary" onClick={load_data} >
          <ListItemIcon onClick={load_data}>
            <AutorenewIcon />
          </ListItemIcon>
          <ListItemText primary="Refresh" />
        </ListItem>
        <ListItem button color="secondary" onClick={clear_data} >
          <ListItemIcon onClick={clear_data}>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Clear" />
        </ListItem>
      </List>
      </Paper>
      </ClickAwayListener>
      </Popper>
      
    </div>
  );
};

export default Chart;
