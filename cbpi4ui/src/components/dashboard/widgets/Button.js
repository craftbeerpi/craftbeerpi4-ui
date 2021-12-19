import { ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, List, ListItem, ListItemText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useMemo, useState } from "react";
import { useActor, useActorType, useCBPi } from "../../data";
import { useDraggable, useModel } from "../DashboardContext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { actorapi } from "../../data/actorapi";
import PropsEdit from "../../util/PropsEdit";
import Confetti from "react-dom-confetti";

const ButtonActionPropsDialog = ({ action = {}, config, open, onClose, onSubmit }) => {
  const [props, setProps] = useState({});

  const onChangeProps = (name, value) => {
    setProps({ ...props, [name]: value });
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle id="simple-dialog-title">{action.label}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container spacing={3}>
            <PropsEdit config={action.parameters} onChange={onChangeProps} props={props} />
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="secondary" autoFocus>
          Close
        </Button>
        <Button onClick={() => onSubmit(props)} variant="contained" color="Primary" autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ActionButton = ({ action, actorid }) => {
  const [open, setOpen] = useState(false);
  const handle_action = (id, action) => {
    actorapi.action(id, action.method, {});
  };

  const handleClose = () => setOpen(false);
  const handle_submit = (props) => {
      actorapi.action(actorid, action.method, props);
      setOpen(false)          
  }


  if (action.parameters.length > 0) {
    return (
      <>
        <ListItem button>
          <ListItemText primary={action.label} onClick={() => setOpen(true)} />
        </ListItem>
        <ButtonActionPropsDialog open={open} action={action} onSubmit={handle_submit} onClose={handleClose}/>
      </>
    );
  } else {
    return (
      <ListItem button  onClick={() => handle_action(actorid, action)}>
        <ListItemText primary={action.label}   />
      </ListItem>
    );
  }
};

const ButtonActionDialog = ({ open, onClose, model, actor }) => {
  const type = useActorType(actor.type);
  const { actor: actorid } = model.props;

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{model.name}</DialogTitle>
      <List>
        {type.actions.map((action, index) => (
          <ActionButton actorid={actorid} action={action} key={index} />
        ))}
        <ListItem button color="secondary">
          <ListItemText primary="Close" onClick={onClose} />
        </ListItem>
      </List>
    </Dialog>
  );
};

export const DashboardButton = ({ id, width, height }) => {
  const cbpi = useCBPi();
  const model = useModel(id);
  const draggable = useDraggable();
  const actor = useActor(model.props?.actor);
  const { actor: actorid, action } = model.props;
  const [open, setOpen] = useState(false);
  const [boom, setBoom] = useState(false);
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  return useMemo(() => {
    let cssStyle = { width: model.width + "px", height: model.height + "px" };
    let btnColor = actor?.state ? "primary" : "primary";
    let btnVariant = actor?.state ? "contained" : "outlined";
    
    const toggle = () => {
      if (!draggable && model.props?.actor) {
        cbpi.actions.toggle_actor(model.props?.actor);
      }
      setBoom(!boom)
    };

    const name = () => {
      if (model.props?.actor && actor) {
        return model.name;
      } else {
        return "Missing Config";
      }
    };

    const power = () => {
      if (model.props?.actor && actor) {
        if(actor.power)
          return actor.power + " %";
      } 
      else {
        return "NV";
      }
    };

    const size = () => {
      if (model.props?.size) {
        let css={ fontSize: model.props.size+"px"};
        return css;
      } else {
        let css={ fontSize: "12px" };
        return css;
      }
    };

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    if (action === "yes" && actor) {
      if (power())
      {
        return (
          <div style={cssStyle}>
            <ButtonGroup>
              <Button disabled={draggable} onClick={toggle} fullWidth variant={btnVariant} color={btnColor}>
              <div style={size()}> {name()}({power()}) </div>
              </Button>
              <Button disabled={draggable} onClick={handleOpen} color="primary" size="small" aria-label="select merge strategy" aria-haspopup="menu">
                <MoreVertIcon />
              </Button>
            </ButtonGroup>
            <ButtonActionDialog open={open} onClose={handleClose} model={model} actor={actor} />
          </div>
        );
      }
      else {
        return (
          <div style={cssStyle}>
            <ButtonGroup>
              <Button disabled={draggable} onClick={toggle} fullWidth variant={btnVariant} color={btnColor}>
              <div style={size()}> {name()} </div>
              </Button>
              <Button disabled={draggable} onClick={handleOpen} color="primary" size="small" aria-label="select merge strategy" aria-haspopup="menu">
                <MoreVertIcon />
              </Button>
            </ButtonGroup>
            <ButtonActionDialog open={open} onClose={handleClose} model={model} actor={actor} />
          </div>
        );
      }
    } else {
      if (power())
      {
        return (
          <div style={cssStyle}>
            <Button disabled={draggable} onClick={toggle} fullWidth variant={btnVariant} color={btnColor}>
            <div style={size()}> {name()} ({power()}) </div>
            </Button>
          </div>
        );
      }
      else{
        return (
        <div style={cssStyle}>
          <Button disabled={draggable} onClick={toggle} fullWidth variant={btnVariant} color={btnColor}>
          <div style={size()}> {name()} </div>
          </Button>
        </div>
      )}
    }
  }, [model.props?.actor, model.props?.size, model.props?.action, model.name, actor, id, open, draggable]);
};
