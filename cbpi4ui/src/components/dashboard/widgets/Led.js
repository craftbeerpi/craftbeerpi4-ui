
import React, { useContext } from "react";
import { useActor } from "../../data";
import { DashboardContext } from "../DashboardContext";


export const Led = ({ id }) => {

    const { actions } = useContext(DashboardContext);
    const model = actions.get_data(id);
    const actor = useActor(model.props?.actor)
    
    let led_state = actor?.state ? "led-green" : "led-green-off "
    return <div className={led_state}></div>;
  };
  