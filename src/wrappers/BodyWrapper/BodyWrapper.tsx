import React, { PureComponent } from "react";
import classes from "./BodyWrapper.css";
import cn from "clsx";
import { NavBar, NavBarItem } from "src/components/ui-kit/NavBar";
import { T } from "react-targem";
import { routes } from "src/config/routes";
import { ChatContextProvider } from "src/contexts/ChatContext/ChatContext";
import { withSettings, WithSettings } from "src/contexts/SettingsContext";

interface BodyWrapperProps extends WithSettings {
  children: React.ReactNode;
}

class BodyWrapper extends PureComponent<BodyWrapperProps> {
  render(): React.ReactNode {
    const { username, userId } = this.props;

    return (
      <ChatContextProvider username={username} userId={userId}>
        <div className={cn(classes.container)}>
          <NavBar>
            <NavBarItem text={<T message="Chat" />} to={routes.home} />
            <NavBarItem text={<T message="Settings" />} to={routes.settings} />
          </NavBar>
          {this.props.children}
        </div>
      </ChatContextProvider>
    );
  }
}

export default withSettings(BodyWrapper);
