import React, { useEffect, useCallback } from "react";

import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { notification } from "antd";

import { N_PATHS } from "../constants/routes";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isActivated, loading } = useSelector((state) => state.auth);

  function showNotification() {
    notification["warning"]({
      message: "Giga Notify",
      description: "you are not authorized to access this page",
    });
  }

  if (isActivated)
    //check if route is in group of routes
    return <Route rest component={Component} />;
  else {
    showNotification();
    return <Redirect to={N_PATHS.Login} />;
  }
};
export default ProtectedRoute;
