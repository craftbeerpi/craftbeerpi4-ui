
import React, { useContext } from "react";
import { useCBPi, useKettle } from "../../data";
import { DashboardContext } from "../DashboardContext";

export const TargetTemp = ({ id }) => {
    const { actions } = useContext(DashboardContext);
    const model = actions.get_data(id);
    const kettle = useKettle(model.props?.kettle)
    const css_style = { color: model?.props?.color || "#fff", fontSize: `${model?.props?.size}px` };
    return <div style={css_style}> {kettle?.target_temp} {model?.props?.unit }</div>;
  };