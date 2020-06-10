import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import { routes } from "src/config/routes";
import HomePage from "./HomePage";

interface PagesProps {}

class Pages extends PureComponent<PagesProps> {
  render(): React.ReactNode {
    return (
      <Switch>
        <Route path={routes.home} component={HomePage} />
      </Switch>
    );
  }
}

export default Pages;
