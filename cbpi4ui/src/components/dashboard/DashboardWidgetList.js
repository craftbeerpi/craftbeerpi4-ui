import { Collapse, ListItemIcon, makeStyles, Paper, Tooltip } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AppsIcon from "@material-ui/icons/Apps";
import React, { useContext } from "react";
import "../../App.css";
import { CBPiGrainIcon, CBPiHopsIcon, CBPiLiquidIcon, CBPiPipeIcon, CBPiYeastIcon } from "../util/icons/CBPiSensorIcon";
import { DashboardContext } from "./DashboardContext";
const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: "red",
  },
  icon: {
    minWidth: "30px",
  },
  largeIcon: {
    width: 60,
    height: 60,
  },

}));

const Icon = ({ icon }) => {
  const WidgetIcon = icon;
  return <WidgetIcon />;
};

const DashboardSidebarListItem = ({ item }) => {
  const { state, actions } = useContext(DashboardContext);
  const selected = state.selected === item.id;

  const classes = useStyles();
  return (
    <Tooltip title={item.name} placement="right">
    <ListItem
      key={item.id}
      button
      selected={selected}
      onClick={() => {
        actions.add(item);
      }}
    >
      <ListItemIcon className={classes.icon}>{item.icon ? <Icon icon={item.icon} /> : null}</ListItemIcon>
    
    </ListItem></Tooltip>
  );
};

const DashboardWidgetList = () => {
  const { actions, state } = useContext(DashboardContext);
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Paper >
      <List component="nav" disableGutters={true} dense aria-label="">
        <ListItem disablePadding key="path" button onClick={handleClick} innerDivStyle={{ paddingLeft: 10 }} selected={open}>
          <ListItemIcon className={classes.icon}>
            <AppsIcon />
          </ListItemIcon>
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" dense disablePadding>
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
              <ListItemIcon className={classes.icon}><CBPiPipeIcon/></ListItemIcon>
              
            </ListItem>
            
          </List>
        </Collapse>
      </List>
      
    </Paper>
  );
};

export default DashboardWidgetList;
