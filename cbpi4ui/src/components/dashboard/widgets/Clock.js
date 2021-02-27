import { useEffect, useState } from "react";
import { useModel } from "../DashboardContext";

export const Clock = ({ id, width, height }) => {
  const model = useModel(id);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const update_time = () => {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    hours = (hours < 10 ? "0" : "") + hours;
    let minutes = currentTime.getMinutes();
    minutes = (minutes < 10 ? "0" : "") + minutes;
    let seconds = currentTime.getSeconds();
    seconds = (seconds < 10 ? "0" : "") + seconds;
    setTime(hours + ":" + minutes + ":" + seconds);
    setDate(new Intl.DateTimeFormat("de-DE").format(new Date()));
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
