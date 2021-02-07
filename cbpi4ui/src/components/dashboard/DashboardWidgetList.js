import { Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, { useContext } from "react";
import "../../App.css";
import { DashboardContext } from "./DashboardContext";

const DashboardSidebarListItem = ({ item }) => {
  const { state, actions } = useContext(DashboardContext);
  const selected = state.selected === item.id;

  return (
    <ListItem
      key={item.id}
      button
      selected={selected}
      onClick={() => {
        actions.add(item);
      }}
    >
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

const DashboardWidgetList = () => {
  const { actions, state } = useContext(DashboardContext);

  return (
    <Paper >
      <List component="nav" disableGutters={true} dense aria-label="main mailbox folders">
        {state.widget_list.map((item) => (
          <DashboardSidebarListItem key={item.name} item={item} />
        ))}

        <ListItem
          key="path"
          button
          onClick={() => {
            actions.add_path();
          }}
        >
          <ListItemText primary="Pipe" />
        </ListItem>
      </List>
    </Paper>
  );
};

export default DashboardWidgetList;
