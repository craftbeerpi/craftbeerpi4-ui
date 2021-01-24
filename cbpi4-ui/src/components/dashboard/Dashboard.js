import React from "react";
import "../../App.css";
import { Dashboard, DashboardProvider } from "./DashboardContext";

const Dashboard2 = () => {
  return (
    <DashboardProvider>
        <Dashboard width="100%" height={1000} />
    </DashboardProvider>  
  );
};

export default Dashboard2;
