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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

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
  const [widgets, setWidgets] = useState([]);
  const widget_dict = widget_list.reduce((a, x) => ({ ...a, [x.type]: x }), {});
  const [dashboardX, setDashboardX] = useState(1);
  const [maxdashboard, setMaxdashboard] = useState(4);
  const [initialdashboard, setInitialdashboard] = useState(0) 

  useEffect(() => {
    dashboardapi.getcurrentdashboard((data) => {
      setInitialdashboard(data);
    });
  }, []);
  
  dashboardapi.getcurrentdashboard((data) => {
    window.currentDashboard = data;
    setDashboardX(data);
    }); 

  const deleteKeyPressed = useKeyPress(8);

    useEffect(() => {
    dashboardapi.dashboardnumbers((data) => {
      setMaxdashboard(data);
    });
  }, []);
  
  
  useEffect(() => {
   // Execute path suppression on if deleteKeyPressed is true, whitout this test, we pass inside the code at the KeyUp event. 
   if (deleteKeyPressed === true)
    {
      if (selected && selected.type === "P") 
      {
        // Get pathes in react states
        const data = [...pathes];
        
        // Get the selected path index
        const index = data.findIndex((e) => e.id === selected.id);

        // Remove that path from the path array.
        data.splice(index, 1);
        //Update Pathes
        setPathes(data);
      }
    }


      if (selected && selected.type === "E")
      {
        //console.log("DEBUG : Remove item id : " + selected.id + " de type : " + selected.type)
        remove(selected.id)
      }
  }, [deleteKeyPressed]);

  const load = (width, height, DashboardID = 1) => {
    dashboardapi.get(DashboardID, (data) => {
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

  // New method for updating path animation condition based on boolean expression 
  const update_path_condition_exp = (id, direction, data) => {

    const index = pathes.findIndex((e) => e.id === id);
    const temp_pathes = [...pathes];

    if(!temp_pathes[index].condition){ 
      // if condition is empty we create it to default values (empty) 
       var dataForInit = {left: [], right: [] };
      update_path_condition(id,dataForInit,"");
    }

    if(direction === "leftExpression"){
        console.log("update expression left : " + data)
        console.log(temp_pathes[index])
        temp_pathes[index].condition.leftExpression = data;
    }
    if(direction === "rightExpression"){
      console.log("update expression right : " + data)
      console.log(temp_pathes[index])
      temp_pathes[index].condition.rightExpression = data;
    }

    setPathes([...temp_pathes]);
  };

  const update_path_condition = (id, dataLeft, dataRight, direction) => {
    const index = pathes.findIndex((e) => e.id === id);
    const temp_pathes = [...pathes];
    console.log("data temp_pathes : ")
    console.log(temp_pathes)
    if(direction === "left"){
      console.log("update condition : " + id + ", direction : " + direction + ", data : " + dataLeft)
      temp_pathes[index].condition.left = dataLeft;
    }
    if(direction === "right"){
      console.log("update condition : " + id + ", direction : " + direction + ", data : " + dataRight)  
      console.log("!!!! DEBUG CONDITION !!!! " + temp_pathes[index].condition)
      temp_pathes[index].condition.right = dataRight;
    }
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

  const clear = useCallback((DashboardID = 1) => {
    dashboardapi.clear(DashboardID, () => {
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
    const conditionInitData = {left: [], right: [], leftExpression:"", rightExpression:"" };
    //setPathes([...pathes, { id, path: data, instance: <Path id={id} coordinates={data} condition={conditionInitData} max_x={width} max_y={height} /> }]);
    setPathes([...pathes, { id, path: data, condition: conditionInitData, instance: <Path id={id} coordinates={data} condition={conditionInitData} max_x={width} max_y={height} /> }]);
    console.log("DEBUG PAHT ADD : ")
    console.log(pathes);
  };

  const get_data = (id) => {
    return elements[id];
  };

  const is_selected = (id) => {
    return selected?.id === id;
  };

  const save = (DashboardID = 1) => {
    let e = elements2.map((value) => ({ id: value.id, name: value.name, x: value.x, y: value.y, type: value.type, props: { ...value.props } }));
    let p = pathes.map((value) => ({ id: value.id, coordinates: value.coordinates, condition: value.condition }));
    console.log("DEBUG CONDITION SAVED")
    console.log(p);
    dashboardapi.save(DashboardID, { elements: e, pathes: p }, () => {
      
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
      maxdashboard,
      dashboardX,
      initialdashboard
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
      setDashboardX,
      save,
    },
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const Dashboard = ({ width, height , fixdash}) => {
  const parentRef = useRef(null);
  const { actions, state } = useContext(DashboardContext);
  
  const dashboardlist = [];
  for (let i=1; i <= state.maxdashboard; i++) {
    dashboardlist.push({'value': i, 'label': String(i)});
  };

  const SelectBox = ({ options, value, onChange }) => {
    return (
    <>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value} onChange={onChange}>
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))},
            theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
        ...theme.colors,
          text: 'black',
          primary25: 'black',
          primary: 'black',
        },
      })}
      </Select>
    </>
  );
  };


  useEffect(() => {
    if (parentRef.current)  {
      let parentHeight = parentRef.current.offsetHeight;
      let parentWidth = parentRef.current.offsetWidth;
      actions.setWidth(parentWidth);
      actions.setHeight(parentHeight);
      if (!fixdash){
      actions.load(parentWidth, parentHeight,state.initialdashboard)}
      else {
        actions.load(parentWidth, parentHeight,0)
        actions.load(parentWidth, parentHeight,fixdash)}
      };
  }, [parentRef,state.initialdashboard, fixdash]);

  const DashBoardChange = (event) => {
    actions.setDashboardX(event.target.value);
    const DashboardID=event.target.value;
    dashboardapi.setcurrentdashboard(DashboardID);
    if (parentRef.current) {
        let parentHeight = parentRef.current.offsetHeight;
        let parentWidth = parentRef.current.offsetWidth;
        actions.setWidth(parentWidth);
        actions.setHeight(parentHeight);
        actions.load(parentWidth, parentHeight, 0);
        actions.load(parentWidth, parentHeight, DashboardID);
      }

  };


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
          {!fixdash ?
          <div style={{ position: "absolute", top: 0, right: 0 }}>
          {state.draggable ? state.dashboardX : <SelectBox options={dashboardlist} value={state.dashboardX} onChange={DashBoardChange}/>} 
            {state.draggable ? 
            
            <DeleteDialog
        
            title="Clear Dashboard"
            message="Do you want to clear the Dashboard"
            callback={() => {
              actions.clear(state.dashboardX);
            }}
          />

            : "" }
            {state.draggable ? <IconButton onClick={() => actions.save(state.dashboardX)}><SaveIcon/></IconButton> : "" }
            <IconButton onClick={() => actions.setDraggable(!state.draggable)}>{state.draggable ? <LockOpenIcon /> : <LockIcon />}</IconButton>
          </div>
          : ""}
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
