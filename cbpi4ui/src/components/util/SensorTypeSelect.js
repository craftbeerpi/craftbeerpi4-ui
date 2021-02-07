
import { InputLabel} from "@material-ui/core"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useCBPi } from "../data";


 const SensorTypeSelect = ({label="Sensor Type", value, onChange, }) => {
    const { state } = useCBPi()
    return <>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            {label}
     </InputLabel>
        <Select fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={onChange}>
                <MenuItem  key="none" value="">---</MenuItem>
            {state.sensorTypes.map((item) => <MenuItem  key={item.name} value={item.name}>{item.name}</MenuItem>)}
        </Select>
    </>
}


export default SensorTypeSelect