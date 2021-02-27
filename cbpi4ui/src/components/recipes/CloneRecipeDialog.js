import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core"
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { recipeapi } from "../data/recipeapi";


export const CloneRecipeDialog = ({id, open, setOpen}) => {

    const history = useHistory()
    const [name, setName] = useState("")

    const create = () => {
        recipeapi.clone(id, name, (id)=> {
            setOpen(false)
            history.push("/recipe/" + id);
          })
    }

    const cancel = () => {
        setOpen(false)
    }

    return <Dialog open={open} onClose={cancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">Clone Recipe</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
            <TextField label="New Name" value={name} onChange={(e)=>setName(e.target.value)} />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={cancel} color="secondary" autoFocus variant="contained">
        Cancel
      </Button>
      <Button onClick={create} color="primary" variant="contained">
        Create
      </Button>
    </DialogActions>
  </Dialog>


}