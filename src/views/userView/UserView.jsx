import React from "react";

import { Layout } from "antd";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { N_PATHS } from "../../constants/routes";
import { useSelector } from "react-redux";

const { Content } = Layout;

function UserView() {
  const { isActivated } = useSelector((state) => state.auth);
  return (
    <Layout>
      <Content className="home-layout-content">
        <Switch>
          {isActivated ? <Redirect to={N_PATHS.Inventory} /> : null}
          <Route component={LoginForm} />
        </Switch>
      </Content>
    </Layout>
  );
}

export default UserView;
