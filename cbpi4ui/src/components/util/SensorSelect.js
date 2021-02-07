import { FormHelperText, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useContext } from "react";
import { CBPiContext } from "../data";

const SensorSelect = ({ label = "Sensor", description="", value, onChange }) => {
  const { state } = useContext(CBPiContext);

  return (
    <>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        {label}
      </InputLabel>
      <Select fullWidth labelId="demo-simple-select-label" id="demo-simple-select" value={value} onChange={onChange}>
        <MenuItem key="sensor-non" value={""}>
          ---
        </MenuItem>
        {state.sensors.map((item) => (
          <MenuItem key={item.name} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{description}</FormHelperText>
    </>
  );
};

export default SensorSelect;
