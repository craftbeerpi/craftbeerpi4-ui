
import React from "react";
import { useFermenter } from "../../data";
import { useModel } from "../DashboardContext";

const FermenterTargetTemp = ({ id }) => {
    
    const model = useModel(id)
    const fermenter = useFermenter(model.props?.fermenter)
    const css_style = { color: model?.props?.color || "#fff", fontSize: `${model?.props?.size}px` };


    if(!fermenter) {
      return "Missing Config"
    }


    return <div style={css_style}> {fermenter?.target_temp} {model?.props?.unit }</div>;
  };

  const FermenterTargetPressure = ({ id }) => {
    
    const model = useModel(id)
    const fermenter = useFermenter(model.props?.fermenter)
    const css_style = { color: model?.props?.color || "#fff", fontSize: `${model?.props?.size}px` };


    if(!fermenter) {
      return "Missing Config"
    }


    return <div style={css_style}> {fermenter?.target_pressure} {model?.props?.unit }</div>;
  };

  export {FermenterTargetTemp, FermenterTargetPressure};