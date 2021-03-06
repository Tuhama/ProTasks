import React, { useEffect, useCallback } from "react";

import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { notification } from "antd";

import { N_PATHS } from "../constants/routes";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isActivated, loading } = useSelector((state) => state.auth);

  const showNotification = useCallback(() => {
    notification["warning"]({
      message: "Giga Notify",
      description: "you are not authorized to access this page",
    });
  }, []);

  useEffect(() => {
    if (!loading && !isActivated) {
      showNotification();
    }
  }, [isActivated, loading, showNotification]);

  if (isActivated)
    //check if route is in group of routes
    return <Route rest component={Component} />;
  else return <Redirect to={N_PATHS.Login} />;
};
export default ProtectedRoute;
