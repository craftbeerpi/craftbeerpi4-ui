
import { InputLabel} from "@material-ui/core"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useContext } from "react";
import { CBPiContext } from "../data";

 const StepTypeSelect = ({label="Logic", value, onChange, }) => {
    const { state } = useContext(CBPiContext);

    return <>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            {label}
     </InputLabel>
        <Select fullWidth
            name="type"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={onChange}>
                <MenuItem  key="none" value="">---</MenuItem>
            {state.stepTypes.map((item) => <MenuItem  key={item.name} value={item.name}>{item.name}</MenuItem>)}
        </Select>
    </>
}


export default StepTypeSelect