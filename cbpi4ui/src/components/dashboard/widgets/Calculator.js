import { TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDraggable, useModel } from "../DashboardContext";

export const Calculator = ({ id }) => {
  const model = useModel(id);
  const [height, setHeight] = useState(model.props.height || 40);
  const [fromTop, setFromTop] = useState(0);
  const [diameter, setDiameter] = useState(model.props.diameter || 40);
  const draggable = useDraggable();
  useEffect(() => {
    setDiameter(model.props.diameter);
  }, [model.props.diameter]);

  if (draggable) {
    return (
      <div className="box" style={{ width: 100, height: 150, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6">Calculator</Typography>
      </div>
    );
  }
  const radius = diameter / 2;
  if (model.props.type === "fromtop") {
    const value = parseFloat((Math.PI * radius * radius * (height - fromTop)) / 1000.0).toFixed(2);
    return (
      <div className="box" style={{ width: 120, padding: 5 }}>
        Volume Calculator
        <div>
          {height} H / {diameter} D
        </div>
        <TextField label="From Top" fullWidth value={fromTop} onChange={(e) => setFromTop(e.target.value)} type="number" />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6">{value}L</Typography>
        </div>
      </div>
    );
  } else {
    const value = parseFloat((Math.PI * radius * radius * height) / 1000.0).toFixed(2);
    return (
      <div className="box" style={{ width: 100 }}>
        Volume Calculator
        <TextField label="Diameter" fullWidth value={diameter} onChange={(e) => setDiameter(e.target.value)} type="number" />
        <TextField label="Height" fullWidth value={height} onChange={(e) => setHeight(e.target.value)} type="number" />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6">{value}L</Typography>
        </div>
      </div>
    );
  }
};
