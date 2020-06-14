import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import { routes } from "src/config/routes";
import ChatPage from "./Chat";
import NotFoundPage from "./NotFound";
import SettingsPage from "./Settings";

interface PagesProps {}

class Pages extends PureComponent<PagesProps> {
  render(): React.ReactNode {
    return (
      <Switch>
        <Route path={routes.home} exact component={ChatPage} />
        <Route path={routes.settings} exact component={SettingsPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Pages;
