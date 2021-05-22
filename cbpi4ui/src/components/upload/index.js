import { Divider, Grid, Paper, Typography , Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React from "react";
import logo from "../../images/cbpi.png";
import { useCBPi } from "../data";

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

const Upload = () => {
  const classes = useStyles();
  const {state} = useCBPi();
  const hiddenFileInput = React.useRef(null);
  const handleChange = event => {
      const fileUploaded = event.target.files[0];
      const FileName = fileUploaded.name;
      let formData = new FormData();
      formData.append("File",fileUploaded)
      console.log(FileName);
      axios({
       method: 'post',
       url: '/upload',
       data: formData,
       headers: {'Content-Type': 'multipart/form-data'}
      })
      .then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });


  };

  return (
    <div>
      <Grid container direction="row" justify="space-between" alignItems="center" style={{ marginTop: 10 }}>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Recipe Upload
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
      <Divider style={{ marginBottom: 10, marginTop: 10 }} />

      <Grid container spacing={2} className={classes.root}>
        <Grid item spacing={2} xs={12}>
          <Paper style={{ padding: 10 }}>
            <p>You can upload BeerXML recipe files or the Kleiner Brauhelfer V2 database .</p>
          </Paper>
        </Grid>
      	  
        <Grid item spacing={2} xs={12}>
          <Paper style={{ padding: 10 }}>
              <Button variant="contained" component="label">
              Upload BeerXML File or KBH V2 database file
              <input ref={hiddenFileInput} 
                     type="file" 
                     onChange={handleChange}
                     hidden
                     />
              </Button> 
          </Paper>
        </Grid>
      

      </Grid>

      
    </div>
  );
};

export default Upload;
