
import React, { useContext } from "react";
import { DashboardContext, useModel } from "../DashboardContext";

export const Text = ({ id }) => {
    const { actions } = useContext(DashboardContext);
    const data = useModel(id)
    const css_style = { color: data?.props?.color || "#fff", fontSize: `${data?.props?.size}px` };
    return <div style={css_style}> {data?.name} </div>;
  };