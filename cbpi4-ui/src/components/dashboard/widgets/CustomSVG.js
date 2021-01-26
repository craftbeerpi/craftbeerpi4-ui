
import React, { useContext,  useEffect, useState } from "react";
import { useActor } from "../../data";
import { DashboardContext } from "../DashboardContext";
import SVG, { Props as SVGProps } from 'react-inlinesvg';

 const CustomSVG = ({ id }) => {
    const [svg, setSvg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const { actions } = useContext(DashboardContext);
    const model = actions.get_data(id);

    const name = model?.props.name
    useEffect(() => {
        fetch("/dashboard/static/"+name)
            .then(res => res.text())
            .then(setSvg)
            .catch(setIsErrored)
            .then(() => setIsLoaded(true))
    }, [model?.props.name]);

    
    
    return <SVG src={`/dashboard/static/${name}.svg`} width={model?.props?.width || 100} height="auto" title={model?.props.name} >SVG not Found</SVG>;
  };
  
  export default CustomSVG