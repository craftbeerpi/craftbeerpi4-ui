import React from "react";
import "../../App.css";
import { useHistory , useParams} from "react-router-dom";
import { Dashboard, DashboardProvider } from "./DashboardContext";

const Dashboard2 = () => {  
  const { id } = useParams();
  return (
    <DashboardProvider>
        <Dashboard width="100%" height={1000} fixdash={id} />
    </DashboardProvider>  
  );
};

export default Dashboard2;
