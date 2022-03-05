import { Breadcrumbs, Divider, Grid, IconButton, Link, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from "@material-ui/icons/Delete";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SaveIcon from "@material-ui/icons/Save";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fermenterrecipeapi } from "../data/fermenterrecipeapi";
import Header from "../util/Header";
import { BasicData } from "./BasicData";
import { FermenterStepList } from "./FermenterStepList";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteDialog from "../util/DeleteDialog";
import { CloneRecipeDialog } from "./CloneRecipeDialog";
import { BrewRecipeDialog } from "./BrewRecipeDialog";
import { CBPiTankIcon } from "../util/icons/CBPiSensorIcon";

const FermenterRecipeEditor = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false)
  const [openferment, setOpenferment] = useState(false)
  const history = useHistory();
  const [steps, setSteps] = useState([]);
  const [basicData, setBasicData] = useState({ name: "", author: "", desc: "" });
  
  useEffect(() => {
    if (id) {
      const success = (data) => {
        setBasicData(data.basic);
        setSteps(data.steps);
        };

      fermenterrecipeapi.load(id, success);
    }
  }, [id]);

  const save = () => fermenterrecipeapi.save(id, { basic: basicData, steps });
  const addStep = () => setSteps([...steps, { name: "", props: {}, type: "" }]);
  const back = () => history.push("/fermenterrecipes");

  //--> Fermenter / fermenterid needs to be selcted in form
 // const brew = () => {
 //   fermenterrecipeapi.brew(id)
 //   history.push("/fermenterprofile")
 // }

  const remove = () => {
    fermenterrecipeapi.remove(id);
    history.goBack();
  };

  const clone = () => {
    setOpen(true)
  };

  const ferment = () => {
    setOpenferment(true)
  };

  return (
    <>
      <Header title="Basic Data">
        <IconButton variant="contained" onClick={back}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton variant="contained" onClick={clone}>
          <FileCopyIcon />
        </IconButton>
        <CloneRecipeDialog id={id} open={open} setOpen={setOpen}/>

        <IconButton variant="contained" onClick={ferment}>
          <CBPiTankIcon />
        </IconButton>
        <BrewRecipeDialog id={id} name={basicData.name} open={openferment} setOpen={setOpenferment}/>

        <IconButton variant="contained" onClick={save}>
          <SaveIcon />
        </IconButton>
        <DeleteDialog
            title="Delete Fermenter Recipe"
            message="Do you want to delete the Fermenter Recipe"
            callback={remove}
          />
      </Header>

      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          onClick={() => {
            history.push("/fermenterprofile");
          }}
        >
          Active Recipe
        </Link>
        <Link
          color="inherit"
          onClick={() => {
            history.push("/fermenterrecipes");
          }}
        >
          Fermenter Recipe Book
        </Link>
        <Typography color="textPrimary">{basicData.name}</Typography>
      </Breadcrumbs>
          <Divider/>

      <BasicData data={basicData} setData={setBasicData} />
      <Header title="Fermenter Steps">
        <IconButton variant="contained" onClick={addStep}>
          <AddIcon />
        </IconButton>
      </Header>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <FermenterStepList items={steps} setItems={setSteps} />
        </Grid>
      </Grid>
    </>
  );
};

export default FermenterRecipeEditor;
