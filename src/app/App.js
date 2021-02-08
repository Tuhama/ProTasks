import React, { useEffect } from "react";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { initialLoadThunk } from "../features/auth/authSlice";
import UserView from "../views/userView/UserView";
import InventoryIssueView from "../views/inventoryIssueView/InventoryIssueView";
import MainView from "../views/mainView/MainView";

import { N_PATHS } from "../constants/routes";
import LoadingIndicator from "../components/loadingIndicator";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initialLoadThunk());
  }, []);

  return (
    <div className="App">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Switch>
          <Route path={N_PATHS.User}>
            <UserView />
          </Route>

          <ProtectedRoute
            path={N_PATHS.Inventory}
            component={InventoryIssueView}
          />
          <Redirect to={N_PATHS.Login} />

          {/*            <Route path="/">
              <MainView />
            </Route>*/}
        </Switch>
      )}
    </div>
  );
}

export default App;
