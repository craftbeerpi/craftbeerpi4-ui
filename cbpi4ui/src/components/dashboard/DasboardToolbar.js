import { Button, Paper } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useContext } from "react";
import DeleteDialog from "../util/DeleteDialog";
import { DashboardContext } from "./DashboardContext";

const DashboardToolbar = () => {
  const { actions, state } = useContext(DashboardContext);

  return (
    <Paper style={{ marginBottom: 5, padding: 5 }}>
      <Button color="primary" onClick={actions.save} variant="contained" size="small" startIcon={<SaveIcon />}>
        Save
      </Button>

      <DeleteDialog
        btnText="Clear"
        title="Clear Dashboard"
        message="Do you want to clear the Dashboard"
        callback={() => {
          
          actions.clear();
        }}
      />
    </Paper>
  );
};

export default DashboardToolbar;
