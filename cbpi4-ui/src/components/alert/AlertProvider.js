import { makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: 10,
    right: 30,
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

export const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
  const classes = useStyles();
  const [alerts, setAlerts] = useState([]);


  const remove = useCallback((id) => {
    setAlerts((value) => {
      return value.filter((a) => a.id !== id);
    });
  }, []);

  const show = useCallback((message = "", timeout = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);

    const alert = {
      id,
      message,
    };

    const timerId = setTimeout(() => {
      remove(id);
    }, timeout);

    setAlerts((state) => state.concat(alert));

    return alert;
  }, []);

  const value = {
    alerts,
    show,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      <div className={classes.root}>
        {alerts.map((a) =>
        {
            
                return (
                    <Alert key={a.id} >{a.message}</Alert>
                  )
        }
        
        
        )}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = (Context) => {
  const alertContext = useContext(AlertContext);
  const alert = useMemo(() => {
    return alertContext;
  }, [alertContext]);
  return alert;
};
