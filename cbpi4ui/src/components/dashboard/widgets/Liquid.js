import { useEffect, useState } from "react";
import { useCBPi } from "../../data";
import { useDraggable, useModel } from "../DashboardContext";

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : {
        r: 0,
        g: 0,
        b: 255,
      };
};

export const Liquid = ({ id }) => {
  const model = useModel(id);
  const { state } = useCBPi();
  const [height, setHeight] = useState(model.props.height || 40);
  const [width, setWidth] = useState(model.props.width || 40);
  const [opacity, setOpacity] = useState(model.props.width || 0.9);
  const [color, setColor] = useState(model.props.color || {r: 0, g:0, b:255});
  const [percent, setPerent] = useState(model.props.percent || 0);
  const [maxvalue, setMaxValue] = useState(model.props.maxvalue || 100);
  const [sensorid, setSensor] = useState(model.props.sensor || null);
  const draggable = useDraggable();

  useEffect(() => {
    setHeight(model.props.height);
    setWidth(model.props.width);
    setPerent(model.props.percent);
    setSensor(model.props.sensor);
    setMaxValue(model.props.maxvalue);

    const rgb = hexToRgb(model.props.color)
    console.log("COLOR", rgb)
    setColor(rgb);


  }, [model.props.maxvalue, model.props.height, model.props.width, model.props.percent, model.props.color, model.props.sensor]);

  if (!sensorid) {
    return <div>Missing Config</div>;
  }
  const data = parseInt(state?.sensorData[sensorid] || 0);



  const style_box = { width: `${width}px`, height: `${height}px` };
  const filling = parseFloat(height) * (parseFloat(data) / parseFloat(maxvalue));
  const style = { background: `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`, width: `${width}px`, height: `${filling}px` };
  return (
    <div style={style_box}>
      <div style={{ ...style, position: "absolute", bottom: 0 }}></div>
    </div>
  );
};
