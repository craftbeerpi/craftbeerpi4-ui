import { List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import React, { useContext, useEffect, useState } from "react";
import { useCBPi } from "../../data";
import MashControl from "../../util/MashControl";
import StepStateChip from "../../util/StepStateChip";
import { DashboardContext } from "../DashboardContext";

export const Steps = ({ id }) => {
  const { actions } = useContext(DashboardContext);
  
  const model = actions.get_data(id);
  const { state } = useCBPi();

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    setProfile(state.mashProfile);
  }, [state.mashProfile]);
  
  let inputStyle = { color: "#fff", width: `${model?.props?.width}px`, fontSize: 12, backgroundColor: "#2c282e", padding: 5, borderRadius: 5 };
  //import CheckCircleIcon from '@material-ui/icons/CheckCircle';
  return (
    <div className="box" style={inputStyle}>
      <div style={{ marign: 20 }}>
        <div className="section_header">List</div>
        <MashControl />
        <List component="nav" aria-label="main mailbox folders">

        {profile.map((row, index) => (

          <ListItem button key={index}>
            <ListItemIcon>
              <StepStateChip state={row.status} />
            </ListItemIcon>
            <ListItemText primary={row.name} secondary={row.state_text} />
          </ListItem>
        ))}
        </List>
      </div>
    </div>
  );
};

export default Steps;
