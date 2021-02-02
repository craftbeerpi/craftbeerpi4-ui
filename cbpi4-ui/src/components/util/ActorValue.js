import { useContext } from "react";
import { CBPiContext } from "../data";


 const ActorValue = ({label = "Actor", id, property="name"}) => {
    const { state } = useContext(CBPiContext);

    const actor = state.actors.find(e => e.id === id)
    return actor ? (<>{actor.name}</>) : (<>Actor not Found</>)
}

export default ActorValue