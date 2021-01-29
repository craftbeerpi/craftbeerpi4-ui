import {

  Checkbox,
  TextField,
  Typography
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CropSquareIcon from '@material-ui/icons/CropSquare';
import React, { useContext, useEffect, useState } from "react";
import { useActor, useCBPi } from "../data";
import ActorSelect from "../util/ActorSelect";
import KettleSelect from "../util/KettleSelect";
import SensorSelect from "../util/SensorSelect";
import {SelectInput} from "../util/SelectInput";
import { DashboardContext } from "./DashboardContext";
import { widget_list } from "./widgets/config";


const DashboardLayerListItem = ({ item }) => {
  const { state, actions } = useContext(DashboardContext);
  const selected = state.selected?.id === item.id;

  return (
    <ListItem
      button
      selected={selected}
      onClick={() => actions.setSelected(()=>({ type: "E", id: item.id}))}
    >
      <ListItemIcon>
        <CropSquareIcon />
      </ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

const DashboardLayerList = () => {
  const { state, actions } = useContext(DashboardContext);
  const data = state.elements;

  return (
    <>
      <div className="section_header">Layer</div>
      <div
        style={{
          padding: 5,
          scrollbarColor: "dark",
          maxHeight: 300,
          overflowY: "scroll",
        }}
      >
        <List component="nav" aria-label="main mailbox folders">
          {Object.values(data).map((e, index) => (
            <DashboardLayerListItem key={index} item={e} />
          ))}
        </List>
      </div>
      
    </>
  );
};

const DashboardLayer = () => {
  
  return (
    <div>
      <div
        onPointerDown={(e) => e.stopPropagation()}
        className="box"
        style={{
          width: 200,
          overflow: "hidden",
          fontFamily: "JetBrains Mono",
          backgroundColor: "#2c282e",
          color: "#fff",
          borderRadius: 5,
        }}
      >
        <div className="handle">
          <b>Settings</b>
        </div>

        <DashboardLayerList />

        <DashboardProps />
      </div>
    </div>
  );
};

const PropsEditor = ({ data }) => {
  const { state, actions } = useContext(DashboardContext);
  const selected_id = state.selected?.id;
  if (!data || !selected_id) {
    return "";
  }
  const type_spec = widget_list.find((item) => item.type === data.type);
  const handlechange = (e, key) => {
    actions.update_prop(selected_id, key, e.target.value);
  };
  return type_spec.props.map((s) => {
    switch (s.type) {
      case "text":
        return (
          <TextField
            label={s.name}
            key={s.name}
            fullWidth
            onChange={(e) => handlechange(e, s.name)}
            value={data.props[s.name]}
          />
        );

        case "select":
          return (
            <SelectInput label="Test"  value={data.props[s.name]}
            key={s.name}
            onChange={(e) => handlechange(e, s.name)}
            options={[1,2]}
            />
          );


      case "actor":
        return (
          <ActorSelect
            value={data.props[s.name]}
            key={s.name}
            onChange={(e) => handlechange(e, s.name)}
          />
        );
      case "sensor":
        return (
          <SensorSelect
            value={data.props[s.name]}
            key={s.name}
            onChange={(e) => handlechange(e, s.name)}
          />
        );
        case "kettle":
          return (
            <KettleSelect
              value={data.props[s.name]}
              key={s.name}
              onChange={(e) => handlechange(e, s.name)}
            />
          );
      default:
        return "";
    }
  });
};

const PathSettingsItem = ({ item, checked, handleToggle }) => {


  return (
    <ListItem
      button
      onClick={handleToggle(item.id)}
    >
      <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(item.id) !== -1}
                tabIndex={-1}
                color="primary"
                disableRipple
                inputProps={{ 'aria-labelledby': "A" }}
              />
            </ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

const PathSettings = () => {
  const { state, actions } = useContext(DashboardContext);
  const actor = useActor()
  const selected_id = state.selected?.id;
  const [selectedType, setSelectedType] = useState(null)
  const [checked, setChecked] = React.useState([]);

  useEffect(()=>{

    
    const item = state.pathes.find((e) => e.id === selected_id);
    setChecked(current => item?.condition || [])

  }, [selected_id])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    actions.update_path_condition(selected_id, newChecked)

  };

  
  useEffect(()=> {
    setSelectedType(()=>state.selected?.type)
  }, [state.selected])
    
  if (selectedType !== "P") {
    return "";
  }
  

  return <>PathSettings
    <List component="nav" aria-label="main mailbox folders">
      {actor.map((item) => <PathSettingsItem item={item} checked={checked} handleToggle={handleToggle}/>)}
    </List>
  </>
}

export const DashboardProps = () => {
  const { state, actions } = useContext(DashboardContext);
  const selected_id = state.selected?.id;
  const selected_type = state.selected?.type;
  const data = actions.get_data(selected_id);
  const handleChange = (e, key) => {
    actions.update_default_prop(selected_id, key, e.target.value);
  };
  const render_form = (data) => {
    if (!data) {
      return "";
    }

    return (
      <TextField
        label="Name"
        fullWidth
        value={data?.name}
        onChange={(e) => handleChange(e, "name")}
      />
    );
  };

  return (
    <div onPointerDown={(e) => e.stopPropagation()}>
      <div className="section_header">Properties</div>
      <div style={{ padding: 10 }}>
        {render_form(data)}
        
        <PropsEditor data={data} />
        <PathSettings />
        <Typography variant="caption" display="block" gutterBottom>
          {data?.x || "0"}px / {data?.y || "0"}px
        </Typography>
      </div>
    </div>
  );
};

export default DashboardLayer;
