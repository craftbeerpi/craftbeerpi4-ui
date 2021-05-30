
import React from "react";
import { useEffect, useState } from "react";
import { useActor } from "../../data";
import { useModel } from "../DashboardContext";

export const Led = ({ id }) => {
    const model = useModel(id)
    const actor = useActor(model.props?.actor)
    const [color, setColor] = useState(model.props.color || "green");

    useEffect(() => {
      setColor(model.props.color);
        
    }, [model.props.color]);

    let led_state = actor?.state ? "led-" + color : "led-" + color + "-off "
    return <div className={led_state}></div>;
  };
  