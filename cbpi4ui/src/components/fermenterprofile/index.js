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
import MenuBookIcon from "@material-ui/icons/MenuBook";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { default as React, useEffect, useState } from "react";
import { useHistory , useParams} from "react-router-dom";
import { useCBPi } from "../data";
import { fermenterapi } from "../data/fermenterapi"; 
import SaveDialog from "../util/SaveDialog"; // Eventuell anpassung notwendig
import FermenterDeleteDialog from "../util/FermenterDeleteDialog";  
import DeleteDialog from "../util/DeleteDialog";
import Header from "../util/Header";
import FermenterControl from "../util/FermenterControl"; //* Anpassen
import StepStateChip from "../util/StepStateChip"; // Eventuell Anpassen. Sollte aber so passen
import SortButton from "./FermenterSortButton";
import FermenterSelect from "../util/FermenterSelect";

const useStyles = makeStyles((theme) => ({
  table: {},
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const FermenterProfile = () => {
  const classes = useStyles();
  const { state } = useCBPi();
  const history = useHistory();
  const [data, setData] = useState([]);
  const { fermenterid } = useParams();

  

  useEffect(() => {
    fermenterapi.getsteps(fermenterid, (data) => {
      setData(data.steps)});
   }, [state.fermentersteps]);

  
  function remove_callback(fermenterid, id) {
    fermenterapi.deletestep(fermenterid, id); 
  }

  const moveCallback = (fermenterid, id, direction) => {
    fermenterapi.movestep(fermenterid, id, direction); 
  };

  const clear = (fermenterid) => {
    fermenterapi.clearsteps(fermenterid); 
  };

  const savetobook = () => {
    fermenterapi.savetobook(); // fermenterapi anpassen
  };

  const onChange = (e) => {
    if (e.target.value) {
    fermenterapi.getsteps(e.target.value, (data) => {
    setData(data.steps)
    history.push("/fermenterprofile/"+e.target.value)});
    };
  };


  if (!fermenterid) { // Mashbasic finden und anpassen (vermutlich //data/index.js)
    return (
      <>
      <Grid container direction="row" justify="space-between" alignItems="center" style={{ marginTop: 10 }}>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            {state.mashBasic.name}{" "}
            <Typography display="inline" color="textSecondary">
              by {state.mashBasic.author}
            </Typography>
          </Typography>
          <Typography color="textSecondary">{state.mashBasic.desc}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Select Fermenter : {" "}
          </Typography> 
          <FermenterSelect value={fermenterid} onChange={onChange} label="" />
        </Grid>
        </Grid>
        </>
    );
  }
 {
  return (
    <>
      <Grid container direction="row" justify="space-between" alignItems="center" style={{ marginTop: 10 }}>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            {state.mashBasic.name}{" "}
            <Typography display="inline" color="textSecondary">
              by {state.mashBasic.author}
            </Typography>
          </Typography>
          <Typography color="textSecondary">{state.mashBasic.desc}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Select Fermenter : {" "}
          </Typography> 
          <FermenterSelect value={fermenterid} onChange={onChange} label="" />
        </Grid>

        <Grid item>
                    
          <FermenterDeleteDialog title="Clear" callback={clear} fermenterid={fermenterid} message="Do you want to clear the Mash Profile" />
          
         {/* <SaveDialog title="Save" callback={savetobook} message="Do you want to save your recipe to the recipe book" />
          
          <IconButton
            variant="contained"
            onClick={() => {
              history.push("/recipes");
            }}
          >
            <MenuBookIcon />
          </IconButton> */}
        </Grid>
      </Grid>

      <Divider style={{ marginBottom: 10, marginTop: 10 }} />

      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Paper className={classes.paper}>
            <Header title="Profile">
              <div style={{ display: "flex" }}>
                <FermenterControl fermenterid={fermenterid} />
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => history.push("/fermenterstep/"+fermenterid)}>
                  ADD
                </Button>
              </div>
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
                        <SortButton index={index} length={data.length} fermenterid={fermenterid} id={row.id} moveCallback={moveCallback} />
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
                        <FermenterDeleteDialog title="Delete Step" message="Do you want to delete the step" fermenterid={fermenterid} id={row.id} callback={remove_callback} />
                        
                        <IconButton aria-label="add" size="small" onClick={() => history.push("/fermenterstep/" + row.id + "/" + fermenterid)}>
                          <VisibilityIcon />
                        </IconButton>                        
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
};
export default FermenterProfile;
