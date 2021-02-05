
import { InputLabel } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useDashboard } from "../dashboard/DashboardContext";


 const WidgetSelet = ({label="Widget", value, onChange, }) => {
    const { state } = useDashboard()
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
            {state.widgets.map((item,index) => <MenuItem  key={index} value={item}>{item}</MenuItem>)}
        </Select>
    </>
}


export default WidgetSelet