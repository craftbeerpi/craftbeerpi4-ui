import { IconButton } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import SaveIcon from "@material-ui/icons/Save";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../App.css";
import { useAlert } from "../alert/AlertProvider";
import { dashboardapi } from "../data/dashboardapi";
import DeleteDialog from "../util/DeleteDialog";
import DashboardLayer from "./DashboardLayer";
import DashboardWidgetList from "./DashboardWidgetList";
import { DashboardContainer } from "./Elements";
import useKeyPress from "./GlobalKeyPress";
import { widget_list } from "./widgets/config";
import { Path } from "./widgets/Path";

export const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
  const alert = useAlert();
  const [selected, setSelected] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [current, setCurrent] = useState("INFO");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [elements, setElements] = useState({});
  const [elements2, setElements2] = useState([]);
  const [draggable, setDraggable] = useState(false);
  const [pathes, setPathes] = useState([]);
  const [widgets, setWidgets] = useState([])
  const widget_dict = widget_list.reduce((a, x) => ({ ...a, [x.type]: x }), {});


  const delelteKeyPressed = useKeyPress(8);

  useEffect(() => {
    if (selected && selected.type === "P") {
      const data = [...pathes];
      const index = data.findIndex((e) => e.id === selected.id);
      data.splice(index, 1);
      setPathes([...data]);
    }
    if (selected && selected.type === "E") {
        remove(selected.id)
    }
  }, [delelteKeyPressed]);

  const load = (width, height) => {
    dashboardapi.get(1, (data) => {
      const errors = [];
      let data_model = data.elements.reduce((a, x) => {
        if (x.type in widget_dict) {
          return { ...a, [x.id]: { ...x, instance: <DashboardContainer key={x.id} id={x.id} type={widget_dict[x.type].component} /> } };
        } else {
          errors.push("Error can't find " + x.type + " Widget");
          return { ...a };
        }
      }, {});

      let data_model2 = data.elements.reduce((a, x) => {
        if (x.type in widget_dict) {
          return [ ...a, { ...x, instance: <DashboardContainer key={x.id} id={x.id} type={widget_dict[x.type].component} /> } ];
        } else {
          errors.push("Error can't find " + x.type + " Widget");
          return [ ...a ];
        }
      }, []);
      
      setElements({ ...data_model });
      setElements2(data_model2);  
      let dm = data.pathes.map((v) => ({ ...v, instance: <Path key={v.id} id={v.id} coordinates={v.coordinates} condition={v.condition} max_x={width} max_y={height} /> }));
      setPathes(dm);
    });

    dashboardapi.widgets((data)=>{
      setWidgets(data)
    })
  };

  const remove = (id) => {
    
    const data = [...elements2];
    const index = data.findIndex((e) => e.id === selected.id);
    data.splice(index, 1);
    setElements2(data);
    setSelected(null);
  };

  const update_default_prop = (id, key, value) => {
    
    const data = [...elements2];
    const index = data.findIndex((e) => e.id === selected.id);
    data[index][key] = value;
    setElements2(data);

  };

  const update_coordinates = (id, x, y  ) => {
    const data = [...elements2];
    const index = data.findIndex((e) => e.id === selected.id);
    data[index].x = x
    data[index].y = y
    setElements2(data);
  };

  const update_prop = (id, key, value) => {
    const data = [...elements2];
    const index = data.findIndex((e) => e.id === selected.id);
    data[index].props[key] = value;
    
    setElements2(data);

  };

  const update_path_condition = (id, data, direction) => {
    const index = pathes.findIndex((e) => e.id === id);
    const temp_pathes = [...pathes];
    if(direction === "left")
    {
      temp_pathes[index].condition.left = data;
    }
    if(direction === "right")
    {
      temp_pathes[index].condition.right = data;
    }
    setPathes([...temp_pathes]);
  };

  // New method for updating path animation condition based on boolean expression 
  const update_path_condition_exp = (id, direction, data) => {
    const index = pathes.findIndex((e) => e.id === id);
    const temp_pathes = [...pathes];
    if(direction === "leftExpression")
        temp_pathes[index].condition.leftExpression = data;
    if(direction=== "rightExpression")
      temp_pathes[index].condition.rightExpression = data;

    setPathes([...temp_pathes]);
  };

  const update_path = (id, data) => {
    const index = pathes.findIndex((e) => e.id === id);
    const temp_pathes = [...pathes];
    temp_pathes[index].coordinates = data;

    setPathes([...temp_pathes]);
  };

  const add = (item) => {
    const id = uuidv4();
    var props = item.props.reduce((obj, item) => Object.assign(obj, { [item.name]: item.default }), {});
    const model = {
      id,
      type: item.type,
      props: props,
      name: item.name,
      x: 10,
      y: 10,
      instance: <DashboardContainer key={id} id={id} type={item.component} />,
    };
    setElements2([ ...elements2,  model ]);
  };

  const clear = useCallback(() => {
    dashboardapi.clear(1, () => {
      setElements2((currentElements) => ([]));
      setPathes((currentPathes) => []);
    });
  }, []);

  const add_path = () => {
    const id = uuidv4();
    const data = [
      [100, 10],
      [100, 110],
    ];
    setPathes([...pathes, { id, path: data, instance: <Path id={id} coordinates={data} condition={null} max_x={width} max_y={height} /> }]);
  };

  const get_data = (id) => {
    return elements[id];
  };

  const is_selected = (id) => {
    return selected?.id === id;
  };

  const save = () => {
    let e = elements2.map((value) => ({ id: value.id, name: value.name, x: value.x, y: value.y, type: value.type, props: { ...value.props } }));
    let p = pathes.map((value) => ({ id: value.id, coordinates: value.coordinates, condition: value.condition }));
    dashboardapi.save(1, { elements: e, pathes: p }, () => {
      
    });
  };

  const value = {
    state: {
      current,
      width,
      height,
      elements2,
      elements,
      pathes,
      selected,
      widgets,
      widget_list,
      draggable,
      selectedPath,
    },
    actions: {
      setCurrent,
      setWidth,
      setHeight,
      add,
      add_path,
      setSelected,
      get_data,
      is_selected,
      clear,
      setElements2,
      remove,
      update_default_prop,
      update_prop,
      update_path_condition,
      update_path_condition_exp, // New Method added for the boolean expression
      update_coordinates,
      setDraggable,
      update_path,
      load,
      setSelectedPath,
      save,
    },
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const Dashboard = ({ width, height }) => {
  const parentRef = useRef(null);
  const { actions, state } = useContext(DashboardContext);

  useEffect(() => {
    if (parentRef.current) {
      let parentHeight = parentRef.current.offsetHeight;
      let parentWidth = parentRef.current.offsetWidth;
      actions.setWidth(parentWidth);
      actions.setHeight(parentHeight);
      actions.load(parentWidth, parentHeight);
    }
  }, [parentRef]);


  return (
    <div>
      
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        {state.draggable ? <DashboardWidgetList /> : null}
        <div
          onPointerDown={() => {
            actions.setSelected((current) => null);
            actions.setSelectedPath((current) => null);
          }}
          ref={parentRef}
          style={{
            position: "relative",
            backgroundColor: "#272227",
            width,
            height,
          }}
        >
          {state.elements2.map((value, index) => value.instance)}
          <svg style={{ position: "absolute", pointerEvents: "none" }} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {state.pathes.map((value) => value.instance)}
          </svg>
          <div style={{ position: "absolute", top: 0, right: 0 }}>
            
            {state.draggable ? 
            
            <DeleteDialog
        
            title="Clear Dashboard"
            message="Do you want to clear the Dashboard"
            callback={() => {
              actions.clear();
            }}
          />

            : "" }
            {state.draggable ? <IconButton onClick={() => actions.save()}><SaveIcon/></IconButton> : "" }
            <IconButton onClick={() => actions.setDraggable(!state.draggable)}>{state.draggable ? <LockOpenIcon /> : <LockIcon />}</IconButton>
          </div>
        </div>
        {state.draggable ? <DashboardLayer /> : null}
      </div>
    </div>
  );
};

export const useDraggable = () => {
  const { state } = useContext(DashboardContext);
  const value = useMemo(() => {
    return state.draggable;
  }, [state.draggable]);
  return value;
};

export const useModel = (id) => {
  const { state } = useContext(DashboardContext);
  const value = useMemo(() => {    
    return state.elements2.find((item) => item.id === id)
  }, [state, state.elements2, id]);
  return value;
};

export const useSelected = (id) => {
  const { state } = useContext(DashboardContext);
  const value = useMemo(() => {
    return state.selected?.id === id;
  }, [ state.selected ]);
  return value;
};

export const useDashboard = (Context) => {
  const { state, actions } = useContext(DashboardContext);
  const value = useMemo(() => {
    return { state, actions}
  }, [ state ]);
  return value;
};
