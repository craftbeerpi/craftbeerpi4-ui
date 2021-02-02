import {  useCBPi } from "../data";


 const SensorValue = ({id}) => {
    const { state } = useCBPi()
    const data = state?.sensorData[id]
    
    return data !== undefined ? (<>{data}</>) : (<>---</>)
}

export default SensorValue