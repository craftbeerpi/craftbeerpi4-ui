import { Chip } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import CachedIcon from "@material-ui/icons/Cached";
import ErrorIcon from "@material-ui/icons/Error";

const StepStateChip = ({ state }) => {
  switch (state) {
    case "I":
      return <Chip label="Inactive" />;
    case "A":
      return <Chip label="Active" icon={<CachedIcon />} color="primary" />;
    case "E":
      return <Chip label="Error" icon={<ErrorIcon />} />;
    case "D":
      return <Chip label="Done" icon={<CheckCircleIcon />} />;
    case "S":
      return <Chip label="Pause" icon={<PauseCircleOutlineIcon />} />;
    default:
      return <Chip label={state} />;
  }
};

export default StepStateChip;
