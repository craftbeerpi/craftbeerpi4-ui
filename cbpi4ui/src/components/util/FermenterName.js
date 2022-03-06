import { useContext } from "react";
import { CBPiContext } from "../data";


 const FermenterName = ({id}) => {
    const { state } = useContext(CBPiContext);

    const item = state.fermenter.find(e => e.id === id)
    return item ? (<>{item.name}</>) : (<>Fermenter not Found</>)
}

export default FermenterName