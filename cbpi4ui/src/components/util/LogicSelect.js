
import { InputLabel } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useCBPi } from "../data";


 const LogicSelect = ({label="Logic", value, onChange, }) => {
    const { state } = useCBPi()
    return <>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            {label} {value}
     </InputLabel>
        <Select fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={onChange}>
                <MenuItem  key="none" value="">---</MenuItem>
            {state.logic.map((item) => <MenuItem  key={item.name} value={item.name}>{item.name}</MenuItem>)}
        </Select>
    </>
}


export default LogicSelect