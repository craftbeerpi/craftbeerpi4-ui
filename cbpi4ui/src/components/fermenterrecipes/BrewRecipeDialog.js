import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core"
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { fermenterrecipeapi } from "../data/fermenterrecipeapi";
import FermenterSelect from "../util/FermenterSelect";
import { Typography } from "@material-ui/core";


export const BrewRecipeDialog = ({id, name, open, setOpen}) => {

    const history = useHistory()
    const [fermenterid, setFermenterID] = useState([])

    const brew = () => {
      console.log(id)
      fermenterrecipeapi.brew(fermenterid, id, name);
      setOpen(false)
      history.push("/fermenterprofile/"+ fermenterid);
    }
    const cancel = () => {
        setOpen(false)
    }

    const onChange = (e) => {
      if (e.target.value) {
      setFermenterID(e.target.value)
      };
    }

    return <Dialog open={open} onClose={cancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">Send Recipe "{name}" to Fermenter</DialogTitle>
    <DialogContent>
           <Typography variant="h5" gutterBottom>
            Select Fermenter : {" "}
          </Typography> 
          <FermenterSelect value={fermenterid} onChange={onChange} label="" />      
    </DialogContent>
    <DialogActions>
      <Button onClick={cancel} color="secondary" autoFocus variant="contained">
        Cancel
      </Button>
      <Button onClick={brew} color="primary" variant="contained">
        Send
      </Button>
    </DialogActions>
  </Dialog>


}