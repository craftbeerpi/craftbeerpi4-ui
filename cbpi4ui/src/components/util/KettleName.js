import { useContext } from "react";
import { CBPiContext } from "../data";


 const KettleName = ({id}) => {
    const { state } = useContext(CBPiContext);

    const item = state.kettle.find(e => e.id === id)
    return item ? (<>{item.name}</>) : (<>Kettle not Found</>)
}

export default KettleName