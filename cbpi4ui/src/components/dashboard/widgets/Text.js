
import React, { useContext } from "react";
import { DashboardContext } from "../DashboardContext";

export const Text = ({ id }) => {
    const { actions } = useContext(DashboardContext);
    const data = actions.get_data(id);
    const css_style = { color: data?.props?.color || "#fff", fontSize: `${data?.props?.size}px` };
    return <div style={css_style}> {data?.name} </div>;
  };