import ListIcon from '@material-ui/icons/List';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SpeedIcon from '@mui/icons-material/Speed';
import { CBPiCalculatorIcon, CBPiControlIcon, CBPiKettle, CBPiKettle2Icon, CBPiLedIcon, CBPiLiquidIcon, CBPiSensorIcon, CBPiSVGIcon, CBPiTankIcon, CBPiThermometerIcon } from '../../util/icons/CBPiSensorIcon';
import { DashboardButton } from "./Button";
import { Calculator } from "./Calculator";
import Chart from "./Chart";
import GrafanaChart from "./GrafanaChart";
import { Clock } from "./Clock";
import CustomSVG from "./CustomSVG";
import { KettleControl } from "./KettleControl";
import { FermenterControl } from "./FermenterControl";
import { Led } from "./Led";
import { Liquid } from './Liquid';
import { SensorData } from "./SensorData";
import Steps from "./Steps";
import { Path } from './Path';
import KettleSVG from "./svg/kettle.svg";
import TankSVG from "./svg/tank2.svg";
import { TargetTemp } from "./TargetTemp";
import { FermenterTargetTemp , FermenterTargetPressure} from "./FermenterTargetTemp";
import { FermenterSteps } from './FermenterSteps';
import { Text } from "./Text";
export const widget_list = [
  {
    name: "Kettle",
    type: "Kettle",
    icon: CBPiKettle2Icon,
    component: KettleSVG,
    props: [
      { name: "width", default: "100", type: "text", unit: "px" },
      { name: "heigth", default: "150", type: "text", unit: "px" },
    ],
  },
  {
    name: "Tank",
    type: "Tank",
    icon: CBPiTankIcon,
    component: TankSVG,
    props: [
      { name: "width", default: "100", type: "text", unit: "px" },
      { name: "heigth", default: "150", type: "text", unit: "px" },
    ],
  },
  {
    name: "Text",
    type: "Text",
    icon: TextFieldsIcon,
    component: Text,
    props: [
      { name: "size", default: "10", type: "text", unit: "pt" },
      { name: "color", default: "#fff", type: "text" },
    ],
  },
  {
    name: "TargetTemp",
    type: "TargetTemp",
    component: TargetTemp,
    icon: CBPiThermometerIcon,
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
    icon: CBPiSensorIcon,
    props: [
      { name: "sensor", default: "", type: "sensor" },
      { name: "unit", default: "°", type: "text" },
      { name: "size", default: "12", type: "text", unit: "pt" },
      { name: "color", default: "#fff", type: "text" },
      { name: "digits", options: ["N/A","0","1", "2","3","4"], default: "N/A", type: "select" },
      { name: "action", options: ["yes", "no"], default: "no", type: "select" }
    ],
  },
  {
    name: "Actor",
    type: "ActorButton",
    component: DashboardButton,
    icon: ToggleOffIcon,
    props: [{ name: "actor", default: "", type: "actor" },{ name: "size", default: "12", type: "text", unit: "pt" },{ name: "action", options: ["yes", "no"], default: "", type: "select" }],
  },
  {
    name: "Led",
    type: "Led",
    component: Led,
    icon: CBPiLedIcon,
    props: [{ name: "actor", default: "", type: "actor" },{name: "color", options: ["green","red","blue"], default: "green", type: "select"}],
  },

  {
    name: "Steps",
    type: "Steps",
    component: Steps,
    icon: ListIcon,
    props: [{ name: "width", default: "200", type: "text", unit: "px" },
            { name: "stepsize", default: "14", type: "text", unit: "pt" },
            { name: "namesize", default: "14", type: "text", unit: "pt" }],
  },
  {
    name: "SVG",
    type: "CustomSVG",
    component: CustomSVG,
    icon: CBPiSVGIcon,
    props: [
      { name: "width", default: "100", type: "text", unit:"px"  },
      { name: "name", default: "", type: "widget" },
    ],
  },
  {
    name: "KettleControl",
    type: "KettleControl",
    icon: CBPiControlIcon,
    component: KettleControl,
    
    props: [
      { name: "kettle", default: "1", type: "kettle" },
      { name: "size", options: ["large","normal","small"], default: "normal", type: "select"},
      { name: "orientation", options: ["horizontal", "vertical"], default: "", type: "select" },
    ],
  },
  {
    name: "Clock",
    type: "Clock",
    component: Clock,
    icon: QueryBuilderIcon,
    props: [
      { name: "size", default: "10", type: "text", unit: "pt" },
      { name: "format", options: ["24","12"], default: "24", type: "select"},
      { name: "showDate", options: ["yes", "no"], default: "no", type: "select" },
      { name: "color", default: "#fff", type: "text" },
    ],
  },
  {
    name: "Chart",
    type: "Chart",
    component: Chart,
    icon: ShowChartIcon,
    props: [
      { name: "sensor", default: "", type: "sensor" },
      { name: "linecolor", default: "#00FF00", type: "text" },
      { name: "refresh", default: 10, type: "number" },
      { name: "width", default: 100, type: "text" }, 
      { name: "height", default: 100, type: "text" }
    ],
  },
  {
    name: "GrafanaChart",
    type: "GrafanaChart",
    component: GrafanaChart,
    icon: AutoGraphIcon,
    props: [
      { name: "url", default: "http://localhost:3000/d-solo/{ID}/{dashboard}", type: "text" },
      { name: "panelID", default: "2", type: "text" },
      { name: "refresh", default: 10, type: "number" },
      { name: "width", default: 100, type: "text" }, 
      { name: "height", default: 100, type: "text" }
    ],
  },
  {
    name: "Calculator",
    type: "Calculator",
    icon: CBPiCalculatorIcon,
    component: Calculator,
    props: [
      
      { name: "type", options: ["total", "fromtop"], default: "", type: "select" },
      { name: "diameter", default: 40, type: "number" },
      { name: "height", default: 40, type: "number" }
    ],
  },
  {
    name: "Liquid",
    type: "Liquid",
    icon: CBPiLiquidIcon,
    component: Liquid,
    props: [
      { name: "color", default: "#0000ff", type: "text" },
      { name: "width", default: 40, type: "number" },
      { name: "height", default: 40, type: "number" },
      { name: "sensor", default: "", type: "sensor" },
      { name: "maxvalue", default: 100, type: "number" }
    ],
  },
  {
    name: "FermenterTargetTemp",
    type: "FermenterTargetTemp",
    component: FermenterTargetTemp,
    icon: CBPiThermometerIcon,
    props: [
      { name: "fermenter", default: "1", type: "fermenter" },
      { name: "unit", default: "°", type: "text" },
      { name: "size", default: "12", type: "text" },
      { name: "color", default: "#fff", type: "text" },
    ],
  },
  {
    name: "FermenterTargetPressure",
    type: "FermenterTargetPressure",
    component: FermenterTargetPressure,
    icon: SpeedIcon,
    props: [
      { name: "fermenter", default: "1", type: "fermenter" },
      { name: "unit", default: "kPa", type: "text" },
      { name: "size", default: "12", type: "text" },
      { name: "color", default: "#fff", type: "text" },
    ],
  },
  {
    name: "FermenterControl",
    type: "FermenterControl",
    icon: CBPiControlIcon,
    component: FermenterControl,
    
    props: [
      { name: "fermenter", default: "1", type: "fermenter" },
      { name: "size", options: ["large","normal","small"], default: "normal", type: "select"},
      { name: "orientation", options: ["horizontal", "vertical"], default: "", type: "select" },
    ],
  },
  {
    name: "FermenterSteps",
    type: "FermenterSteps",
    component: FermenterSteps,
    icon: ListIcon,
    props: [{ name: "fermenter", default: "1", type: "fermenter" },
            { name: "width", default: "200", type: "text", unit: "px" },
            { name: "stepsize", default: "14", type: "text", unit: "pt" },
            { name: "namesize", default: "14", type: "text", unit: "pt" }],
  }
  
];

/*
{
    name: "Chart",
    type: "Chart",
    component: Chart,
    props: [{ name: "width", default: 100, type: "text" }, { name: "height", default: 100, type: "text" }],
  },
*/
