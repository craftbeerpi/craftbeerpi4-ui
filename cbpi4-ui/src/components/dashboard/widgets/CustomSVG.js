
import React, { useContext } from "react";
import SVG from 'react-inlinesvg';
import { DashboardContext } from "../DashboardContext";

 const CustomSVG = ({ id }) => {
    
    const { actions } = useContext(DashboardContext);
    const model = actions.get_data(id);
    const name = model?.props.name
  
    return <SVG src={`/dashboard/static/${name}.svg`} width={model?.props?.width || 100} height="auto" title={model?.props.name} >SVG not Found</SVG>;
  };
  
  export default CustomSVG

