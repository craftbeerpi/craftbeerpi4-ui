import { useContext } from "react";
import { CBPiContext } from "../data";


 const SensorName = ({id}) => {
    const { state } = useContext(CBPiContext);

    const item = state.sensors.find(e => e.id === id)
    return item ? (<>{item.name}</>) : (<>Sensor not Found</>)
}

export default SensorName