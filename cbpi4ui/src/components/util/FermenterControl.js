import { Button, ButtonGroup } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import StopIcon from "@material-ui/icons/Stop";
import { default as React, useEffect, useState } from "react";
import { useCBPi } from "../data";
import { fermenterapi } from "../data/fermenterapi";
import SkipNextIcon from '@material-ui/icons/SkipNext';



const FermenterControl = ({fermenterid=null, disabled=false}) => {
  const { state } = useCBPi();
  const [stop, setStop] = useState(null);
  const [reset, setReset] = useState(null);
  const [start, setStart] = useState(null);
  const [next, setNext] = useState(null);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
  
    if (fermenterid) {  
      const step= state.fermentersteps.find(step => step.id === fermenterid).steps;
      setSteps(step)};
   }, [state.fermentersteps, fermenterid]);

  useEffect(() => {
    if (steps.filter((item) => item.status === "D").length === steps.length) {
      setStop(false);
      setReset(true);
      setStart(false);
      setNext(false);
      return;
    }
    if (steps.filter((item) => item.status === "I").length === steps.length) {
      setStop(false);
      setReset(false);
      setStart(true);
      setNext(false);
      return;
    }
    if (steps.find((item) => item.status === "A")) {
      setStop(true);
      setReset(false);
      setStart(false);
      setNext(true);
    } else {
      setStop(false);
      setReset(true);
      setStart(true);
      setNext(true);
    }
  }, [steps, fermenterid]);

  if( steps.length === 0) {
    return <></>
  }

  return (
    <>
    <ButtonGroup disabled={disabled} fullWidth>
      {start ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            fermenterapi.startstep(fermenterid);
          }}
          startIcon={<PlayCircleOutlineIcon />}
        >
          
        </Button>
      ) : null}

      {next ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            fermenterapi.nextstep(fermenterid);
          }}
          startIcon={<SkipNextIcon />}
        >
          
        </Button>
      ) : null}

      {stop ? (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<StopIcon />}
          onClick={() => {
            fermenterapi.stopstep(fermenterid);
          }}
        >
          
        </Button>
      ) : null}

      {reset ? (
        <Button startIcon={<RotateLeftIcon />} variant="contained" color="secondary" onClick={() => fermenterapi.reset(fermenterid)}>
          
        </Button>
      ) : null}
      </ButtonGroup>
    </>
  );
};

export default FermenterControl;
