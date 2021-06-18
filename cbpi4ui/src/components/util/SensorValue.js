import {  useCBPi } from "../data";


 const SensorValue = ({id, digits}) => {
    const { state } = useCBPi();
    const data = state?.sensorData[id];
    if ((digits === "N/A" ) || (digits === undefined)) {
    return data !== undefined ? (<>{data}</>) : (<>---</>)
    }
    else {
        return data !== undefined ? (<>{data.toFixed(parseInt(digits))}</>) : (<>---</>)
    }
}

export default SensorValue