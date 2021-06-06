import { Button, Grid, Typography, Divider, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import { uploadapi } from "../data/uploadapi"

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



const SelectBox = ({ options, value, onChange }) => {
    return (
    <>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value} onChange={onChange}>
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};


const Upload = () => {
  const classes = useStyles();
  const hiddenFileInput = React.useRef(null);
  const handleChange = event => {
      const fileUploaded = event.target.files[0];
      const FileName = fileUploaded.name;
      let formData = new FormData();
      formData.append("File",fileUploaded);
      console.log("Start upload");
      uploadapi.sendFile(formData, ReloadPage());
  };

  const ReloadPage = () => {
    console.log("Upload done -> reload page");
    /*window.location.reload();*/
}

  
  const XMLSubmit = () => {
    uploadapi.sendXML(xml, path);
  };

  const KBHSubmit = () => {
    uploadapi.sendKBH(kbh, path);
  };

  const [kbhlist,setKBHList] = useState([]);
  const [xmllist,setXMLList] = useState([]);
  const [xml, setXML] = useState([]);
  const [kbh, setKBH] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    uploadapi.getpath((data) => {
      setPath(data);
    });
  }, []);
  
  useEffect(() => {
    uploadapi.getkbh((data) => {
      setKBHList(data);
    });
  }, []);

  useEffect(() => {
    uploadapi.getxml((data) => {
      setXMLList(data);
    });
  }, []);

  const XMLChange = (event) => {
    setXML(event.target.value);
  };

  const KBHChange = (event) => {
    setKBH(event.target.value);
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
      
      <Divider style={{ marginBottom: 10, marginTop: 10 }} />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Select Recipe</TableCell>
              <TableCell align="right">Create</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>    
          
              <TableRow>
                <TableCell>
                  <InputLabel id="demo-simple-select-helper-label">BeerXML Recipe from uploaded file</InputLabel>
                  <SelectBox options={xmllist} value={xml} onChange={XMLChange} />   
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" component="label" >
                  Create Recipe from BeerXML recipe
                  <input
                    value={xml}
                    onClick={XMLSubmit}
                    hidden
                  />
                  </Button> 
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InputLabel id="demo-simple-select-helper-label">Recipe from Kleiner Brauhelfer Database</InputLabel>
                  <SelectBox options={kbhlist} value={kbh} onChange={KBHChange} />   
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" component="label" >
                  Create Recipe from KBH Database
                  <input
                    value={kbh}
                    onClick={KBHSubmit}
                    hidden
                  />
                  </Button> 
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>  

      
      </Grid>
     
      
    </div>
  );
};

export default Upload;
