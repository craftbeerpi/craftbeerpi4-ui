import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import CBPiWebSocket from "./websocket";
import { actorapi } from "./actorapi";
import { useEventCallback } from "@material-ui/core";
import { useAlert } from "../alert/AlertProvider";
import { kettleapi } from "./kettleapi";
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
  const [mashBasic, setMashBasic] = useState([]);
  const [stepTypes, setStepTypes] = useState([]);
  const [auth, setAuth] = useState(null);
  const [plugins, setPlugins] = useState([]);
  const [temp, setTemp] = useState("");
  const [version, setVersion] = useState("---")
  const alert = useAlert();

  const onMessage = (data) => {
    console.log("WS", data);
    switch (data.topic) {
      case "kettleupdate":
        setKettle(() => data.data);
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
      case "sensorupdate":
        setSensors(() => data.data);
        break;
      default:
        break;
    }
  };

  const processWebSocketMessage = (data) => {
    switch (data.type) {
      case "SENSOR_UPDATE":
        let id = data.topic.variables.id;
        let value = data.payload.value;
        setSensorData({ ...sensorData, [id]: value });
        break;
      case "CONFIG_UPDATE":
        let config_key = data.topic.variables.id;
        let config_value = data.payload.value;
        setConfig((current_config) => ({ ...current_config, [config_key]: { ...current_config[config_key], value: config_value } }));
        break;
      case "STEP_UPDATE":
        let step_value = data.payload;
        setMashProfile((c) => step_value.data);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const ws = new CBPiWebSocket(onMessage, alert);
    ws.connect();

    axios.get("/system/").then((res) => {
      const data = res.data;
      console.dir(data);
      setKettle(data.kettle.data);
      setSensors(data.sensor.data);
      setActors(data.actor.data);
      setLogic(Object.values(data.kettle.types));
      setActorTypes(Object.values(data.actor.types));
      setSensorTypes(Object.values(data.sensor.types));
      setMashProfile(data.step.profile);
      setMashBasic(data.step.basic);
      setConfig(data.config);
      setVersion(data.version);
      setStepTypes(Object.values(data.step.types));
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
    state: { sensors, version, actors, logic, kettle, auth, plugins, temp, sensorData, actorTypes, sensorTypes, config, mashProfile, mashBasic, stepTypes },
    actions: {
      delete_kettle,
      add_kettle,
      target_temp_kettle,
      toggle_logic,
      update_kettle,
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
    },
  };

  return <CBPiContext.Provider value={value}>{children}</CBPiContext.Provider>;
};

export const useCBPi = (Context) => {
  const { state, actions } = useContext(CBPiContext);
  const value = useMemo(() => {
    return { state, version: state.version, kettle: state.kettle, actor: state.actors, sensor: state.sensors, config: state.config, actions };
  }, [ state ]);
  return value;
};

export const useSensor = (id) => {
  const { sensor, state } = useCBPi();
  const value = useMemo(() => {
    return sensor.find((item) => item.id === id);
  }, [{ state }]);
  return value;
};

export const useKettle = (id) => {
  const { kettle } = useCBPi();
  const value = useMemo(() => {
    return kettle.find((item) => item.id === id);
  }, [kettle]);
  return value;
};

export const useActor = (id = null) => {
  const { actor } = useCBPi();
  const value = useMemo(() => {
    return id === null ? actor : actor.find((item) => item.id === id);
  }, [actor]);
  return value;
};
