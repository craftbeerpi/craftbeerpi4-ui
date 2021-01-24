import { Button, TextField } from "@material-ui/core";
import { default as React, useEffect, useState } from "react";
import { useAlert } from "../alert/AlertProvider";
import { useCBPi } from "../data";
import { stepapi } from "../data/stepapi";
import Header from "../util/Header";

const MashBasicDataForm = () => {
  const {state} = useCBPi()
  const [name, setName]  = useState("")
  const alert = useAlert()
  useEffect(()=> {
    setName(state.mashBasic.name)
  }, [])

  const save = () => {
    stepapi.save_basic({name}, ()=> {alert.show("Basic Data Saved")})
  }

  return (
    <>
      <Header title="Basic Data">
          <Button  variant="contained" color="primary" onClick={save} >Save</Button>
      </Header>
      <TextField value={name} onChange={(e)=>setName(e.target.value)} required id="name" label="Name" />
    </>
  );
};

export default MashBasicDataForm
