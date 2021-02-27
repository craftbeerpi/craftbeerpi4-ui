import { useContext } from "react";
import { CBPiContext } from "../data";


 const ActorName = ({id}) => {
    const { state } = useContext(CBPiContext);

    const item = state.actors.find(e => e.id === id)
    return item ? (<>{item.name}</>) : (<>Actor not Found</>)
}

export default ActorName