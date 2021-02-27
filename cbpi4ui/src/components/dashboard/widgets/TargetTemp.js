
import React from "react";
import { useKettle } from "../../data";
import { useModel } from "../DashboardContext";

export const TargetTemp = ({ id }) => {
    
    const model = useModel(id)
    const kettle = useKettle(model.props?.kettle)
    const css_style = { color: model?.props?.color || "#fff", fontSize: `${model?.props?.size}px` };


    if(!kettle) {
      return "Missing Config"
    }


    return <div style={css_style}> {kettle?.target_temp} {model?.props?.unit }</div>;
  };