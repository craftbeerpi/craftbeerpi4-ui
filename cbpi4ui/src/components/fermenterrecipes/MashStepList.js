import { Accordion, AccordionDetails, AccordionSummary, Grid, Hidden, IconButton, TextField, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useEffect, useState } from "react";
import { useCBPi } from "../data";
import PropsEdit from "../util/PropsEdit";
import StepTypeSelect from "../util/StepTypeSelect";
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const MashStepLine = ({ item, items, setItems, onSelectType, handleInput, handleInputProps, index, remove }) => {
  const { state } = useCBPi();
  const [propsConfig, setPropsConfig] = useState(null);

  useEffect(() => {
    const type2 = state.stepTypes.find((i) => i.name === item.type);
    if (type2 && type2.properties) {
      setPropsConfig(type2?.properties);
    }
  }, [item.type]);

  const onChangeProps = (name, value) => {
    handleInputProps(index, name, value);
  };

  const onRemove = (event) => {
    event.stopPropagation();
    remove(index);
  };

  const move = function (array, index, delta) {
    const values = [...array];
    var newIndex = index + delta;
    if (newIndex < 0 || newIndex === values.length) return; //Already at the top or bottom.
    var indexes = [index, newIndex].sort(); //Sort the indixes
    values.splice(indexes[0], 2, values[indexes[1]], values[indexes[0]]); //Replace from lowest index, two elements, reverting the order

    setItems(values);
  };

  const move_up = (index) => {
    move(items, index, -1);
  };

  const move_down = (index) => {
    move(items, index, 1);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            {!item.type ? <ReportProblemIcon color="secondary" fontSize="small"/>  : ""}
            <Typography display="inline">{item.name || "NO NAME"}</Typography> -{" "}
            <Typography variant="subtitle2" display="inline" color="textSecondary">
              {item.type || "NO TYPE"}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton disabled={index === items.length-1}
              edge="end"
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                move_down(index);
              }}
            >
              <ArrowDownwardIcon />
            </IconButton>
            <IconButton
              disabled={index === 0}
              edge="end"
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                move_up(index);
              }}
            >
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={onRemove}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={2}>
            <TextField label="Name" name="name" onChange={(e) => handleInput(index, e)} value={item.name} fullWidth />
          </Grid>
          <Grid item xs={12} lg={2}>
            <StepTypeSelect value={item.type} onChange={(e) => onSelectType(index, e.target.value)} />
          </Grid>
          <Hidden lgDown>
            <Grid item xs={12} lg={8}/>
          </Hidden>
          <PropsEdit config={propsConfig} data={item?.props || {}} onChange={onChangeProps} />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export const MashStepList = ({ items = [], setItems }) => {

  const handleInputProps = (index, name, value) => {
    const values = [...items];
    values[index].props[name] = value;
    setItems([...values]);
  };

  const handleInput = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems([...values]);
  };

  const handleSelectType = (index, value) => {
    const values = [...items];
    values[index].type = value;
    values[index].props = {};
    setItems([...values]);
  };

  const remove_entry = (index) => {
    const values = [...items];
    const filteredItems = values.slice(0, index).concat(values.slice(index + 1, values.length));
    setItems(filteredItems);
  };

  const props = { items, setItems, remove: remove_entry, onSelectType: handleSelectType, handleInputProps, handleInput };

  return items.map((item, index) => <MashStepLine {...props} item={item} index={index}  />);
};
