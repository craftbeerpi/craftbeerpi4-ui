
import { Switch } from "@material-ui/core";
import { useCBPi } from "../data";


 const ActorSwitch = ({label = "Actor", id, property="name"}) => {
    const { state, actions } = useCBPi()
    const actor = state.actors.find(e => e.id === id)
    return actor ? (<Switch onChange={()=>actions.toggle_actor(actor.id)} checked={actor.state} inputProps={{ 'aria-label': 'secondary checkbox' }}/>) : (<>Actor not found</>)
}

export default ActorSwitch