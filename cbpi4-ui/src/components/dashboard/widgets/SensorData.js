import { Typography } from "@material-ui/core";
import { default as React, useContext } from "react";
import { DashboardContext } from "../DashboardContext";
import SensorValue from "../../util/SensorValue";


export const SensorData = ({ id }) => {
    const {state, actions } = useContext(DashboardContext);
    const model = actions.get_data(id);
    const sensor_id = model?.props?.sensor;
   
    const css_style = { color: model?.props?.color || "#fff", fontSize: `${model?.props?.size}px` };
    return <div style={css_style}><SensorValue id={sensor_id} />{model.props?.unit}</div>;



    
  };