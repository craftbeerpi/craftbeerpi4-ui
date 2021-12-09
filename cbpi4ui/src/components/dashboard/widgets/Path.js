import React, { useContext, useEffect, useState } from "react";
import { useActor } from "../../data";
import classNames from 'classnames';
import { DashboardContext } from "../DashboardContext";

export const Path = ({ id, coordinates, condition = {left: [], right: [], leftExpression:null, rightExpression:null }, stroke = 10, max_x = 400, max_y = 600 }) => {
  const { state, actions } = useContext(DashboardContext);
  const actor = useActor();
  const [data, setData] = useState(coordinates);
  const [dragging, setDragging] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [flowLeft, setFlowLeft] = useState(false)
  const [flowRight, setFlowRight] = useState(false)
  const [rightExpression, SetFlowExpRight] = useState(false); // rightExpression and useState Hook for SetFlowRightExp
  const [leftExpression, SetFlowExpLeft] = useState(false);   // leftExpression and useState Hook for SetFlowleftExp

  const p = state.pathes.find((e) => e.id === id);

  useEffect(() => {
    
    const actor_cache = actor.reduce((obj, item) => {
      obj[item.id] = item.state;
      return obj;
    }, {});

        // Add a cache of actor states by name, used for calculate the expression
    const actor_cacheFromName = actor.reduce((obj, item) => {
     // console.log("DEBUG : Item : " + item.name + " State : " + item.state)
      obj[item.name] = item.state;
      return obj;
    }, {});  

    // split the expression
    var bStateAction = false;    

    // Add a control to check if a boolean expression is added in path properties
    // If an expression is present in the left or right direction, we don't check the checked value for calculating animation state. 
    if((!p.condition?.leftExpression || p.condition?.leftExpression.length === 0) )
    {
      if (!p.condition?.left || p.condition?.left.length === 0) 
      {
        setFlowLeft(false);
        console.log("SetFlow Left OFF");
      } 
      else 
      {
        setFlowLeft(p.condition?.left.reduce((sum, next) => sum && actor_cache[next], true));
      }
    }
    if(!p.condition?.rightExpression || p.condition?.rightExpression.length === 0)
    {
      if (!p.condition?.right || p.condition?.right.length === 0) 
      {
        console.log("SetFlow Right OFF");
        setFlowRight(false);
      }
      else 
      {
      setFlowRight(p.condition?.right.reduce((sum, next) => sum && actor_cache[next], true));
      }
    }

    // If the rightExpression value is entered in the path property.
    if(p.condition?.rightExpression)
    { 
      bStateAction = false;
      var boolExpressionRight = p.condition.rightExpression;
      const actorsId =p.condition.rightExpression.split("\"");
      
      console.log("On check l'expression RIGHT : "+ boolExpressionRight);

      // For each part of the string, we check if this is an actor name, if so we replace the actor name by the resulting state.  
      for(var actorId of actorsId) 
      {
        // Check if we process an actorId
        if(typeof actor_cacheFromName[actorId] === "boolean") // Check if this is an actor ID or just an operator.
        {
          boolExpressionRight = boolExpressionRight.replace('\"' +  actorId + '\"', actor_cacheFromName[actorId].toString());
          console.log("Eval right after replace : " + boolExpressionRight)
        }
      }
      // Evaluation of the expression
      // TODO : in order to be safer, plane to use something else than eval (in the craftbeerpi context, i'm not sur it can cause any security problem : TO BE CONFIRMED)
      try
      {
        bStateAction = eval(boolExpressionRight);
        console.log("right, Eval de : " + boolExpressionRight + "  Result = " + bStateAction.toString());
        console.log("EvalRightAnimation : " + bStateAction.toString());
        if(bStateAction ===true || bStateAction === false){   
          console.log("On anime a right ..." + bStateAction);     
          setFlowRight(bStateAction, true);
        } 

      }
      catch(error){
        console.trace("Evaluation of boolean expression Right failure : check your boolean expression for path animation");
      }
    }

     // If the leftexpression value is entered in the path property.
     if(p.condition?.leftExpression)
     { 
       bStateAction = false;
       var boolExpressionLeft = p.condition.leftExpression;
       
       const actorsId = p.condition.leftExpression.split("\"");
       console.log("On check l'expression LEFT : "+ boolExpressionLeft);
       
       // For each part of the string, we check if this is an actor name, if so we replace the actor name by the resulting state.  
       
              for(var actorId of actorsId)
       {
         // Check if we process an actorId
         if(typeof actor_cacheFromName[actorId] === "boolean") 
         {            
          boolExpressionLeft =  boolExpressionLeft.replace('\"'+ actorId + '\"', actor_cacheFromName[actorId].toString());
           console.log("Eval left after replace : " + boolExpressionLeft)
         }
       }
       // Evaluation of the expression
       // TODO : in order to be safer, plane to use something else than eval (in the craftbeerpi context, i'm not sur it can cause any security problem : TO BE CONFIRMED)
       try 
       {
         bStateAction = eval(boolExpressionLeft);
         console.log("Left, Eval de : " + boolExpressionLeft + "  Result = " + bStateAction.toString());
         console.log("EvalLeftAnimation : " + bStateAction.toString());
         if(bStateAction ===true || bStateAction === false){      
           console.log("On anime a left ..." + bStateAction);
           setFlowLeft(bStateAction, true);
         }
       } 
       catch (error) 
       {
         console.error("Evaluation of boolean expression left failure : check your boolean expression for path animation");
       }
     }

  }, [actor]);


  const draggable = state.draggable;
  const gen_path = () => {
    let path_string = "";
    for (const [index, value] of data.entries()) {
      const [x, y] = value;
      index === 0 ? (path_string += "M ") : (path_string += " L ");
      path_string += x;
      path_string += " ";
      path_string += y;
    }
    return path_string;
  };

  const add_point = (e, index, x, y) => {
    e.stopPropagation();
    e.preventDefault();
    const d2 = [...data.slice(0, index + 1), [x, y], ...data.slice(index + 1)];
    setData([...d2]);
  };

  const remove_point = (index) => {
    data.splice(index, 1);
    setData([...data]);
  };

  const render_handles = () => {
    const len = data.length;
    let result = [];
    for (const [index, value] of data.entries()) {
      if (index < len - 1) {
        const [x, y] = value;
        const [next_x, next_y] = data[index + 1];
        const x_point = (x + next_x) / 2;
        const y_point = (y + next_y) / 2;
        result.push(
          <g>
            <circle onPointerDown={(e) => add_point(e, index, x_point, y_point)} cx={x_point} cy={y_point} fillOpacity="0.4" r={12} />
            <text x={x_point} y={y_point} textAnchor="middle" fontSize="20px" fill="#fff" alignmentBaseline="central">
              +
            </text>
          </g>
        );
      }
    }
    return result;
  };

  const down = (e, index) => {
    e.stopPropagation();
    const el = e.target;
    el.setPointerCapture(e.pointerId);
    setOrigin({ x: data[index][0], y: data[index][1], clientX: e.clientX, clientY: e.clientY });
    setDragging(true);
  };

  const up = (e, index) => {
    e.stopPropagation();
    setDragging(false);
    actions.update_path(id, data);
  };
  const move = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    if (dragging) {
      const delta_x = e.clientX - origin.clientX;
      const detal_y = e.clientY - origin.clientY;
      const data2 = [...data[index]];

      if (origin.x + delta_x < 0) {
        data2[0] = 0;
      } else if (origin.x + delta_x > max_x) {
        data2[0] = max_x;
      } else {
        const t = origin.x + delta_x;
        data2[0] = origin.x + delta_x - (t % 5);
      }

      if (origin.y + detal_y < 0) {
        data2[1] = 0;
      } else if (origin.y + detal_y > max_y) {
        data2[1] = max_y;
      } else {
        const t2 = origin.y + detal_y;
        data2[1] = origin.y + detal_y - (t2 % 5);
      }
      const d2 = [...data.slice(0, index), data2, ...data.slice(index + 1)];
      setData([...d2]);
    }
  };

  const handle = () => {
    return data.map((p, index) => (
      <g key={index}>
        <circle cx={p[0]} cy={p[1]} r="5" fill="#8efa00" />
        <circle
          onDoubleClick={() => {
            remove_point(index);
          }}
          onPointerMove={(e) => move(e, index)}
          onPointerDown={(e) => down(e, index)}
          onPointerUp={(e) => up(e, index)}
          cx={p[0]}
          cy={p[1]}
          r="20 "
          fill="#8efa00"
          fillOpacity="0.1"
        />
        <text x={p[0]} y={p[1]} textAnchor="middle"   fontWeight="bold" fontSize="10px" fill="#000" alignmentBaseline="central">
              {index === 0 ? "L": ""}
              {index === data.length-1 ? "R": ""}
            </text>
      </g>
    ));
  };

  const select = (e) => {
    if (!draggable) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    setActive(!active);
    //actions.setSelectedPath((current) => ({ type: "P", id }));
    actions.setSelected((current) => ({ type: "P", id }));
  };

  const glow = () => (is_acktive() ? "10%" : "0%");
  const is_acktive = () => actions.is_selected(id);
  const animation = classNames({ flowLeft: flowLeft }, { flowRight: flowRight });
  return (
    <>
      <g key={id}>
        <path d={gen_path()} id="1" fill="none" stroke="#9A9A9A" strokeLinejoin="round" strokeWidth={stroke} pointerEvents="stroke"></path>
        <path className={animation} strokeLinejoin="round" d={gen_path()} fill="none" stroke="#4A4A4A" strokeWidth={stroke - 2} strokeMiterlimit="10" pointerEvents="stroke"></path>
        <path onPointerDown={(e) => select(e)} d={gen_path()} fill="none" strokeOpacity={glow()} stroke="blue" strokeLinejoin="round" strokeWidth={stroke + 10} pointerEvents="stroke"></path>
        {is_acktive() ? handle() : ""}
        {is_acktive() ? render_handles() : ""}
      </g>
    </>
  );
};
