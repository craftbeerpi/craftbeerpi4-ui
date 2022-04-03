import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import CBPiWebSocket from "./websocket";
import { actorapi } from "./actorapi";
import { useEventCallback } from "@material-ui/core";
import { useAlert } from "../alert/AlertProvider";
import { kettleapi } from "./kettleapi";
import { fermenterapi } from "./fermenterapi";
import { sensorapi } from "./sensorapi";
let MQTTPattern = require("mqtt-pattern");

const messageTypes = {
  "sensor/+id/data": "SENSOR_UPDATE",
  "config/+id/update": "CONFIG_UPDATE",
  "step/update": "STEP_UPDATE",
};

export const CBPiContext = createContext({});

export const CBPiProvider = ({ children }) => {
  const [sensors, setSensors] = useState([]);
  const [sensorData, setSensorData] = useState({});
  const [config, setConfig] = useState({});
  const [actors, setActors] = useState([]);
  const [logic, setLogic] = useState([]);
  const [actorTypes, setActorTypes] = useState([]);
  const [sensorTypes, setSensorTypes] = useState([]);
  const [kettle, setKettle] = useState([]);
  const [mashProfile, setMashProfile] = useState([]);
  const [FermenterProfile, setFermenterProfile] = useState([]);
  const [mashBasic, setMashBasic] = useState([]);
  const [stepTypes, setStepTypes] = useState([]);
  const [stepTypesFermenter, setStepTypesFermenter] = useState([]);
  const [auth, setAuth] = useState(null);
  const [plugins, setPlugins] = useState([]);
  const [temp, setTemp] = useState("");
  const [version, setVersion] = useState("---");
  const [codename, setCodename] = useState("---");
  const a = useAlert();
  const [notification, setNotifiaction] = useState("");
  const [fermenter, setFermenter] = useState([]);
  const [fermenterlogic, setFermenterLogic] = useState([]);
  const [fermentersteps, setFermenterSteps] = useState([]);

  const onMessage = useCallback((data) => {
    //console.log("WS", data);

    //!!!!!!!!!!!!!!!!!!!!!! Add Fermenterstepupdate to cbpi server
    switch (data.topic) {
      case "kettleupdate":
        setKettle(() => data.data);
        break;
      case "fermenterupdate":
        setFermenter(() => data.data);
        console.log(data.data);
        break;
      case "fermenterstepupdate":
        setFermenterSteps(() => data.data);
        break;
      case "actorupdate":
        setActors(() => data.data);
        break;
      case "sensorstate":
        setSensorData((current) => ({ ...current, [data.id]: data.value }));
        break;
      case "step_update":
        setMashProfile(() => data.data);
        break;
      case "mash_profile_update":
        setMashProfile(() => data.data.steps);
        setMashBasic(data.data.basic);
        break;
      case "sensorupdate":
        setSensors(() => data.data);
        break;
      case "notifiaction":
        
        a.show(data.id, data.title, data.message, data.type, data.action);
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    setNotifiaction(null);
  }, [notification]);

  useEffect(() => {
    const ws = new CBPiWebSocket(onMessage, alert);
    ws.connect();

    axios.get("/system/").then((res) => {
      const data = res.data;
      console.log(data)
      setKettle(data.kettle.data);
      setFermenter(data.fermenter.data);
      setFermenterLogic(Object.values(data.fermenter.types));
      setFermenterSteps((data.fermentersteps));
      setSensors(data.sensor.data);
      setActors(data.actor.data);
      setLogic(Object.values(data.kettle.types));
      setActorTypes(Object.values(data.actor.types));
      setSensorTypes(Object.values(data.sensor.types));
      setMashProfile(data.step.steps);
      setFermenterProfile(data.fermenter.data);
      setMashBasic(data.step.basic);
      setConfig(data.config);
      setVersion(data.version);
      setCodename(data.codename);
      setStepTypes(Object.values(data.step.types));
      setStepTypesFermenter(Object.values(data.fermenter.steptypes));
      setAuth(true);
    });
  }, []);

  // Step API
  const get_step_by_id = (id) => mashProfile.find((item) => item.id === id);
  const add_kettle = (data, onSuccess = () => {}, onError = () => {}) => kettleapi.add(data, onSuccess, onError);
  const update_kettle = (id, data, onSuccess = () => {}, onError = () => {}) => kettleapi.save(id, data, onSuccess, onError);
  const delete_kettle = (id, onSuccess = () => {}, onError = () => {}) => kettleapi.remove(id, onSuccess, onError);
  const target_temp_kettle = useEventCallback((id, temp) => kettleapi.target_temp(id, temp), []);
  const toggle_logic = useEventCallback((id) => kettleapi.toggle(id), []);

  const get_fermentersteps_by_id = (fermenterid, id) => fermentersteps.find((item) => item.id === fermenterid);
  const add_fermenter = (data, onSuccess = () => {}, onError = () => {}) => fermenterapi.add(data, onSuccess, onError);
  const update_fermenter = (id, data, onSuccess = () => {}, onError = () => {}) => fermenterapi.save(id, data, onSuccess, onError);
  const delete_fermenter = (id, onSuccess = () => {}, onError = () => {}) => fermenterapi.remove(id, onSuccess, onError);
  const target_temp_fermenter = useEventCallback((id, temp) => fermenterapi.target_temp(id, temp), []);
  const target_pressure_fermenter = useEventCallback((id, pressure) => fermenterapi.target_pressure(id, pressure), []);
  const toggle_logic_fermenter = useEventCallback((id) => fermenterapi.toggle(id), []);

  const add_actor = (data, onSuccess = () => {}, onError = () => {}) => actorapi.add(data, onSuccess, onError);
  const update_actor = (id, data, onSuccess = () => {}, onError = () => {}) => actorapi.save(id, data, onSuccess, onError);
  const delete_actor = (id, onSuccess = () => {}, onError = () => {}) => actorapi.remove(id, onSuccess, onError);
  const get_actor_by_id = (id) => actors.find((item) => item.id === id);

  const toggle_actor = useEventCallback((id) => {
    const actor = get_actor_by_id(id);
    if (!actor) return;
    if (actor.state === false) {
      actorapi.on(id, (data) => setActors((current_actors) => current_actors.map((item, index) => (item.id === id ? { ...item, state: true } : item))));
    } else {
      actorapi.off(id, (data) => setActors((current_actors) => current_actors.map((item, index) => (item.id === id ? { ...item, state: false } : item))));
    }
  }, []);

  const add_sensor = (data, onSuccess = () => {}, onError = () => {}) => sensorapi.add(data, onSuccess, onError);
  const update_sensor = (id, data, onSuccess = () => {}, onError = () => {}) => sensorapi.save(id, data, onSuccess, onError);
  const delete_sensor = (id, onSuccess = () => {}, onError = () => {}) => sensorapi.remove(id, onSuccess, onError);

  const get_sensor_by_id = (id) => sensors.find((item) => item.id === id);

  const value = {
    state: { sensors, version, codename, actors, logic, kettle, fermenter, fermenterlogic, auth, plugins, temp, sensorData, 
             actorTypes, sensorTypes, config, mashProfile, fermentersteps, FermenterProfile, mashBasic, stepTypes, stepTypesFermenter },
    actions: {
      delete_kettle,
      add_kettle,
      target_temp_kettle,
      toggle_logic,
      update_kettle,
      delete_fermenter,
      add_fermenter,
      target_temp_fermenter,
      target_pressure_fermenter,
      toggle_logic_fermenter,
      update_fermenter,
      add_actor,
      update_actor,
      delete_actor,
      toggle_actor,
      get_actor_by_id,
      add_sensor,
      update_sensor,
      delete_sensor,
      get_sensor_by_id,
      get_step_by_id,
      get_fermentersteps_by_id,
    },
  };

  return <CBPiContext.Provider value={value}>{children}</CBPiContext.Provider>;
};

export const useCBPi = (Context) => {
  const { state, actions } = useContext(CBPiContext);
  const value = useMemo(() => {
    return {
      state,
      version: state.version,
      codename: state.codename,
      kettle: state.kettle,
      fermenter: state.fermenter,
      actor: state.actors,
      actorTypes: state.actorTypes,
      sensor: state.sensors,
      sensorTypes: state.sensorTypes,
      config: state.config,
      actions,
    };
  }, [state]);
  return value;
};

export const useSensor = (id = null) => {
  const { sensor, state } = useCBPi();
  const value = useMemo(() => {
    return id === null ? sensor : sensor.find((item) => item.id === id);
  }, [sensor, id]);
  return value;
};

export const useKettle = (id) => {
  const { kettle } = useCBPi();
  const value = useMemo(() => {
    return kettle.find((item) => item.id === id);
  }, [kettle, id,]);
  return value;
};

export const useFermenter = (id) => {
  const { fermenter } = useCBPi();
  const value = useMemo(() => {
    return fermenter.find((item) => item.id === id);
  }, [fermenter, id,]);
  return value;
};

export const useActor = (id = null) => {
  const { actor } = useCBPi();
  const value = useMemo(() => {
    return id === null ? actor : actor.find((item) => item.id === id);
  }, [actor, id]);
  return value;
};
export const useActorType = (name = null) => {
  const { actorTypes } = useCBPi();
  const value = useMemo(() => {
    return name === null ? actorTypes : actorTypes.find((item) => item.name === name);
  }, [actorTypes, name]);
  return value;
};

export const useSensorType = (name = null) => {
  const { sensorTypes } = useCBPi();
  const value = useMemo(() => {
    return name === null ? sensorTypes : sensorTypes.find((item) => item.name === name);
  }, [sensorTypes, name]);
  return value;
};
