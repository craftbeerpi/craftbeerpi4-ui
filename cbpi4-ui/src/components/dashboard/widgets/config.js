
import { ReactComponent as KettleSVG } from "./svg/kettle.svg";
import { Text } from "./Text";
import { DashboardButton } from "./Button";
import { SensorData} from './SensorData';
import Chart from "./Chart";
import { TargetTemp } from "./TargetTemp";
import { Led } from "./Led";
import { KettleControl } from "./KettleControl";
import Steps from "./Steps";
import CustomSVG from './CustomSVG'

export const widget_list = [
  {
    name: "Kettle",
    type: "Kettle",
    component: KettleSVG,
    props: [
      { name: "width", default: "100", type: "text" },
      { name: "heigth", default: "150", type: "text" },
    ],
  },
  {
    name: "Text",
    type: "Text",
    component: Text,
    props: [
      { name: "size", default: "10", type: "text" },
      { name: "color", default: "#fff", type: "text" },
    ],
  },
  {
    name: "TargetTemp",
    type: "TargetTemp",
    component: TargetTemp,
    props: [
      { name: "kettle", default: "1", type: "kettle" },
      { name: "unit", default: "°", type: "text" },
      { name: "size", default: "12", type: "text" },
      { name: "color", default: "#fff", type: "text" },
    ],
  },
  
  {
    name: "Sensor Data",
    type: "Sensor",
    component: SensorData,
    props: [
      { name: "sensor", default: "", type: "sensor" },
      { name: "unit", default: "", type: "text" },
    ],
  },
  {
    name: "Actor",
    type: "ActorButton",
    component: DashboardButton,
    props: [{ name: "actor", default: "", type: "actor" }],
  },
  {
    name: "Led",
    type: "Led",
    component: Led,
    props: [{ name: "actor", default: "", type: "actor" }],
  },
  
  {
    name: "Steps",
    type: "Steps",
    component: Steps,
    props: [{ name: "width", default: "100", type: "text" }],
  },
  {
    name: "CustomSVG",
    type: "CustomSVG",
    component: CustomSVG,
    props: [{ name: "width", default: "100", type: "text" }, { name: "name", default: "", type: "text" }],
  },
  {
    name: "KettleControl",
    type: "KettleControl",
    component: KettleControl,
    props: [{ name: "kettle", default: "1", type: "kettle" }, { name: "orientation", default: "", type: "select" }],
  },
  
  
];


/*
{
    name: "Chart",
    type: "Chart",
    component: Chart,
    props: [{ name: "width", default: 100, type: "text" }, { name: "height", default: 100, type: "text" }],
  },
*/
