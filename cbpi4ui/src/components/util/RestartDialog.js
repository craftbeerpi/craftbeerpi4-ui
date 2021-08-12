import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import React from "react";

const RestartDialog = ({ btnText, title, message, callback, id }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const no = () => {
    setOpen(false);
  };

  const yes = () => {
    setOpen(false);
    callback(id);
  };

  return (
    <>
      {btnText ? (
        <Button color="secondary" onClick={handleClickOpen} variant="contained" size="small" startIcon={<SettingsBackupRestoreIcon />}>
          {btnText}
        </Button>
      ) : (
        <IconButton aria-label="restart"  onClick={handleClickOpen}>
          <SettingsBackupRestoreIcon />
        </IconButton>
      )}

      <Dialog open={open} onClose={no} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={no} color="secondary" autoFocus variant="contained">
            No
          </Button>
          <Button onClick={yes} color="primary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RestartDialog;
