import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CBPiContext } from "../data";
import { sensorapi } from "../data/sensorapi";
import DeleteDialog from "../util/DeleteDialog";
import SensorValue from "../util/SensorValue";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SensorTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state, actions } = useContext(CBPiContext);

  const remove_callback = (id) => {
    sensorapi.remove(id);
    actions.delete_sensor(id);
  };

  function OneWireID(sensor) {
    return sensor.props.Sensor ? sensor.props.Sensor : ""
  };
  

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} dense table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right" className="hidden-xs">
                Type
              </TableCell>
              <TableCell align="right" className="hidden-xs">
                OneWire ID
              </TableCell>
              <TableCell align="right" className="hidden-xs">
                Sensor ID
              </TableCell>
              <TableCell align="right" className="hidden-xs">
                Value
              </TableCell>
              <TableCell align="right" className="hidden-xs">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.sensors.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right" className="hidden-xs">
                  {row.type}
                </TableCell>
                <TableCell align="right" className="hidden-xs">
                  {OneWireID(row)}
                </TableCell>
                <TableCell align="right" className="hidden-xs">
                  {row.id} 
                </TableCell>
                <TableCell align="right" className="hidden-xs">
                  <SensorValue id={row.id}/>
                </TableCell>
                <TableCell align="right" className="hidden-xs">
                  <DeleteDialog title="Delete Sensor" message="Do you want to delete the Sensor" id={row.id} callback={remove_callback} />
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      history.push("/sensor/" + row.id);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SensorTable;
