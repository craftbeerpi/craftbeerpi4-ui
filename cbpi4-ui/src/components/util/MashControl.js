import { Button } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import StopIcon from "@material-ui/icons/Stop";
import { default as React, useEffect, useState } from "react";
import { useCBPi } from "../data";
import { stepapi } from "../data/stepapi";

const MashControl = () => {
  const { state } = useCBPi();
  const [stop, setStop] = useState(null);
  const [reset, setReset] = useState(null);
  const [start, setStart] = useState(null);

  useEffect(() => {
    if (state.mashProfile.find((item) => item.status === "A")) {
      setStop(true);
      setReset(false);
      setStart(false);
    } else {
      setStop(false);
      setReset(true);
      setStart(true);
    }
  }, [state.mashProfile]);

  return (
    <>
      {start ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            stepapi.start();
          }}
          startIcon={<PlayCircleOutlineIcon />}
        >
          Start
        </Button>
      ) : null}

      {stop ? (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<StopIcon />}
          onClick={() => {
            stepapi.stop();
          }}
        >
          Stop
        </Button>
      ) : null}

      {reset ? (
        <Button startIcon={<RotateLeftIcon />} variant="contained" color="secondary" onClick={() => stepapi.reset()}>
          Reset
        </Button>
      ) : null}
    </>
  );
};

export default MashControl;
