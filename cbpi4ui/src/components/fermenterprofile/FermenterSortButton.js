import { IconButton } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { default as React } from "react";

const FermenterSortButton = ({ index, length, fermenterid, id, moveCallback }) => {
  if (length <= 1) {
    return (
      <>
        <IconButton aria-label="delete" size="small" disabled>
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton aria-label="delete" size="small" disabled>
          <ArrowDownwardIcon />
        </IconButton>
      </>
    );
  } else if (index === 0) {
    return (
      <>
        <IconButton aria-label="delete" size="small" disabled>
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            moveCallback(fermenterid, id, 1);
          }}
        >
          <ArrowDownwardIcon />
        </IconButton>
      </>
    );
  } else if (index + 1 === length) {
    return (
      <>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            moveCallback(fermenterid, id, -1);
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton aria-label="delete" size="small" disabled>
          <ArrowDownwardIcon />
        </IconButton>
      </>
    );
  } else {
    return (
      <>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            moveCallback(fermenterid, id, -1);
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            moveCallback(fermenterid, id, 1);
          }}
        >
          <ArrowDownwardIcon />
        </IconButton>
      </>
    );
  }
};

export default FermenterSortButton;
