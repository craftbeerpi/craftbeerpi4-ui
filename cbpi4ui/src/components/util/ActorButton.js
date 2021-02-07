import { Button } from "@material-ui/core";
import { useCBPi } from "../data";


 const ActorButton = ({label = "Actor", id, property="name"}) => {
    const { state, actions } = useCBPi()
    const actor = state.actors.find(e => e.id === parseInt(id))
    return actor ? (<Button>{actor.state ? "ON" : "OFF"}</Button>) : (<>Actor not found</>)
}

export default ActorButton