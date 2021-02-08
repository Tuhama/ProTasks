import React from "react";

import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const { Content } = Layout;

function UserView() {
  return (
    <Layout>
      <Content className="home-layout-content">
        <Switch>
          <Route component={LoginForm} />
        </Switch>
      </Content>
    </Layout>
  );
}

export default UserView;
