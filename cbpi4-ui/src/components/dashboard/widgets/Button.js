import Button from "@material-ui/core/Button";
import React, { useContext, useMemo } from "react";
import { useCBPi } from "../../data";
import { DashboardContext } from "../DashboardContext";


export const DashboardButton = ({ id, width, height }) => {

  
  
    const { state, actions } = useContext(DashboardContext);
    const cbpi = useCBPi()
    
    const model = actions.get_data(id);

    return useMemo(() => {

    const actor = cbpi.state.actors.find(e => e.id === model.props?.actor)
    let cssStyle = { width: model.width + "px", height: model.height + "px" };
    let btnColor = actor?.state ? "primary" : "primary"
    let btnVariant= actor?.state ? "contained" : "outlined"
    const toggle = () => {
      if(!state.draggable && model.props?.actor) {
        cbpi.actions.toggle_actor(model.props?.actor)
      }
    }    
    const name = () => {
      if(model.props?.actor && actor) {
          return model.name
      }
      else {
        return "Missing Config"
      }
    }
    return (
      <div style={cssStyle}>
        <Button onClick={toggle} fullWidth variant={btnVariant} color={btnColor}>
            {name()}
        </Button>
      </div>
    );

    })
  };
  
  