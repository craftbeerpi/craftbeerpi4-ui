import { createTheme, ThemeProvider } from '@material-ui/core';
import pink from "@material-ui/core/colors/pink";
import React from 'react';
import ReactDOM from 'react-dom';
import CraftBeerPiApp from './App';
import { AlertProvider } from './components/alert/AlertProvider';
import { CBPiProvider } from './components/data';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-72473288-2');
ReactGA.pageview(window.location.pathname + window.location.search);

console.log("%cCraftBeerPi 4.0 🍻", "color:#8efa00; background:#000; font-size: 30pt");
console.log("%cCreated with ♥️ by Manuel Fritsch", "color:#8efa00; background:#000; font-size: 10pt");
const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: "#00FF00"
    },
    secondary: pink,
  },
  typography: {
    fontFamily: [
      'Advent Pro',
    ].join(','),
  }  
});
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <AlertProvider>
    <CBPiProvider>
     
    
      <CraftBeerPiApp />
     
    
    </CBPiProvider>
    </AlertProvider>
    </ThemeProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
