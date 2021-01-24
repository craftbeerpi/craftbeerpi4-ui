import { Button, Divider, IconButton, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { default as React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCBPi } from "../data";
import { stepapi } from "../data/stepapi";
import DeleteDialog from "../util/DeleteDialog";
import Header from "../util/Header";
import MashControl from "../util/MashControl";
import StepStateChip from "../util/StepStateChip";
import MashBasicDataForm from "./BasicDataForm";
import SortButton from "./SortButton";

const useStyles = makeStyles((theme) => ({
  table: {},
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const Recipe = () => {
  const classes = useStyles();
  const { state } = useCBPi();
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(state.mashProfile);
  }, [state.mashProfile]);

  const remove_callback = (id) => {
    stepapi.remove(id);
  };

  const moveCallback = (id, direction) => {
    stepapi.move(id, direction);
  };

  return (
    <>
      <Grid container direction="row" justify="space-between" alignItems="center" style={{ marginTop: 10 }}>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Mash Profile
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
      <Divider style={{ marginBottom: 10, marginTop: 10 }} />
      <Grid container spacing={3}>
        <Grid item sm={4}>
          <Paper className={classes.paper}>
            <MashBasicDataForm />
          </Paper>
        </Grid>
        <Grid item sm={8}>
          <Paper className={classes.paper}>
            <Header title="Profile">
              <MashControl />
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => history.push("/step")}>
                ADD
              </Button>
            </Header>
            <TableContainer size="small">
              <Table className={classes.table} dense table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right" className="hidden-xs">
                      Type
                    </TableCell>
                    <TableCell align="right" className="hidden-xs">
                      Summary
                    </TableCell>
                    <TableCell align="right" className="hidden-xs">
                      State
                    </TableCell>
                    <TableCell align="right" className="hidden-xs">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell width="100px">
                        <SortButton index={index} length={data.length} id={row.id} moveCallback={moveCallback} />
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="right" className="hidden-xs">
                        {row.type}
                      </TableCell>
                      <TableCell align="right" className="hidden-xs">
                        {row.state_text}
                      </TableCell>
                      <TableCell align="right" className="hidden-xs">
                        <StepStateChip state={row.status} />
                      </TableCell>
                      <TableCell align="right" className="hidden-xs">
                        <IconButton aria-label="add" size="small" onClick={() => history.push("/step/" + row.id)}>
                          <VisibilityIcon />
                        </IconButton>
                        <DeleteDialog title="Delete Step" message="Do you want to delete the step" id={row.id} callback={remove_callback} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Recipe;
