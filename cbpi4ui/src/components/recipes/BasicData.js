import { TextField } from "@material-ui/core";
import { default as React, useState } from "react";

export const BasicData = ({data, setData}) => {


  const handleChange = (event) => {
    const values = {...data};
    values[event.target.name] = event.target.value;
    setData({...values});
  }
  return (
    <>
      <TextField fullWidth name="name" value={data.name} onChange={handleChange}  id="name" label="Name" />
      <TextField fullWidth name="author" value={data.author} onChange={handleChange}  id="author" label="Author" />
      <TextField  name="desc" fullWidth multiline value={data.desc} onChange={handleChange} id="desc" label="Description" />
    </>
  );
};
