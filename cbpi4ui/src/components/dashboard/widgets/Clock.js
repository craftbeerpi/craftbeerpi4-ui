import { useEffect, useState } from "react";
import { useModel } from "../DashboardContext";

export const Clock = ({ id, width, height }) => {
  const model = useModel(id);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const update_time = () => {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    minutes = (minutes < 10 ? "0" : "") + minutes;
    let seconds = currentTime.getSeconds();
    seconds = (seconds < 10 ? "0" : "") + seconds;
    if (model.props.format === "12") {
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(hours + ':' + minutes + ':'+ seconds + ' ' + ampm);
      setDate(new Intl.DateTimeFormat("en-US" 
        ).format(new Date()));
      }
     else {    
      hours = (hours < 10 ? "0" : "") + hours;
      setTime(hours + ":" + minutes + ":" + seconds);
      setDate(new Intl.DateTimeFormat("de-DE" 
       ).format(new Date()));
      }
  };


  useEffect(() => {
    update_time()
    const interval = setInterval(() => {

        update_time()
    }, 1000);
    return () => clearTimeout(interval);
  });
  const css_style = { color: model?.props?.color || "#fff", fontSize: `${model?.props?.size}px` };
  return (
    <div style={css_style}>
      {model?.props?.showDate === "yes" ? `${date} ` : ""}

      {time}
    </div>
  );
};
