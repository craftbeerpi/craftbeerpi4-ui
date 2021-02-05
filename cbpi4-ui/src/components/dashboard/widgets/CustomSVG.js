
import React from "react";
import { useModel } from "../DashboardContext";

 const CustomSVG = ({ id }) => {
    const model = useModel(id);
    const name = model?.props.name

    if(name) {
      return <img src={`/dashboard/static/${name}.svg`}  width={model?.props?.width || 100} height="auto" className="no-drag"  alt="SVG NOT FOUND"/>
    }
    else{
      return <div>MISSING CONFIG</div>
    }

  };
  
  export default CustomSVG

