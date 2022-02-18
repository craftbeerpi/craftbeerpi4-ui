import { Button, ButtonGroup } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import StopIcon from "@material-ui/icons/Stop";
import { default as React, useEffect, useState } from "react";
import { useCBPi } from "../data";
import { fermenterapi } from "../data/fermenterapi";
import SkipNextIcon from '@material-ui/icons/SkipNext';

// Muss variabel für den entsprechenden Fermenter angepasst werden
// Fermenterprofile muss für entsprechenden Fermenter gefiltert werden und dann steps...

const FermenterControl = ({disabled=false}) => {
  const { state } = useCBPi();
  const [stop, setStop] = useState(null);
  const [reset, setReset] = useState(null);
  const [start, setStart] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    if (state.FermenterProfile.filter((item) => item.status === "D").length === state.FermenterProfile.length) {
      setStop(false);
      setReset(true);
      setStart(false);
      setNext(false);
      return;
    }
    if (state.FermenterProfile.filter((item) => item.status === "I").length === state.FermenterProfile.length) {
      setStop(false);
      setReset(false);
      setStart(true);
      setNext(false);
      return;
    }
    if (state.FermenterProfile.find((item) => item.status === "A")) {
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
  }, [state.FermenterProfile]);

  if( state.FermenterProfile.length == 0) {
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
            fermenterapi.start();
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
            fermenterapi.next();
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
            fermenterapi.stop();
          }}
        >
          
        </Button>
      ) : null}

      {reset ? (
        <Button startIcon={<RotateLeftIcon />} variant="contained" color="secondary" onClick={() => fermenterapi.reset()}>
          
        </Button>
      ) : null}
      </ButtonGroup>
    </>
  );
};

export default FermenterControl;
