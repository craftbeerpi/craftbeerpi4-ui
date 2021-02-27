import {FormHelperText, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useContext } from "react";
import { CBPiContext } from "../data";

const KettleSelect = ({ label = "Kettle", description="", value, onChange, fullWidth=false}) => {
  const { state } = useContext(CBPiContext);

  return (
    <>
      {label ? (<InputLabel shrink id="demo-simple-select-placeholder-label-label">
        {label}
      </InputLabel>): ""}
      
      <Select fullWidth={fullWidth} labelId="demo-simple-select-label" id="demo-simple-select" value={value} onChange={onChange}>
      <MenuItem key="actor-non" value="">---</MenuItem>
        {state.kettle.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{description}</FormHelperText>
    </>
  );
};

export default KettleSelect;
