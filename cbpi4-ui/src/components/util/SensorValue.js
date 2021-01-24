import {  useCBPi } from "../data";


 const SensorValue = ({id}) => {
    const { state } = useCBPi()
    const data = state?.sensorData[id]
    
    return data ? (<>{data}</>) : (<>---</>)
}

export default SensorValue