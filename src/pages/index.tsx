import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import { routes } from "src/config/routes";
import ChatPage from "./Chat";
import NotFoundPage from "./NotFound";

interface PagesProps {}

class Pages extends PureComponent<PagesProps> {
  render(): React.ReactNode {
    return (
      <Switch>
        <Route path={routes.home} exact component={ChatPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Pages;
