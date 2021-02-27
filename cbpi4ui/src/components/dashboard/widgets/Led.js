
import React from "react";
import { useActor } from "../../data";
import { useModel } from "../DashboardContext";

export const Led = ({ id }) => {
    const model = useModel(id)
    const actor = useActor(model.props?.actor)
    let led_state = actor?.state ? "led-green" : "led-green-off "
    return <div className={led_state}></div>;
  };
  