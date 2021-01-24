import { Redirect } from "react-router-dom";
import React, { useContext } from "react";
import { Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import logo from "../../images/cbpi_pattern.png";
import { ReactComponent as CBPiSVG } from "../../images/CBPi_logo.svg";


import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { CBPiContext } from "../data";

const PrivateRoute = ({ children, ...rest }) => {
  const { state } = useContext(CBPiContext);

  if (state.auth === null) {
    //if (true) {
    return (
      <Box className="loadingbg" width="100%" height="100vh" display="flex" justifyContent="center" flexDirection="column">
        <Box display="flex" justifyContent="center">
          <CBPiSVG/>
        </Box>
        <Typography variant="body2" color="textSecondary" align="center">
          Please wait
        </Typography>
      </Box>
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        state.auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/about",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
