import React, { PureComponent } from "react";
import classes from "./BodyWrapper.css";
import cn from "clsx";
import { NavBar, NavBarItem } from "src/components/ui-kit/NavBar";
import { T } from "react-targem";
import { routes } from "src/config/routes";
import { withChat, WithChat } from "src/contexts/ChatContext";

interface BodyWrapperProps extends WithChat {
  children: React.ReactNode;
}

class BodyWrapper extends PureComponent<BodyWrapperProps> {
  render(): React.ReactNode {
    const { chatMessagesUnreadCount } = this.props;
    return (
      <div className={cn(classes.container)}>
        <NavBar>
          <NavBarItem
            text={<T message="Chat" />}
            to={routes.home}
            badge={chatMessagesUnreadCount}
            isBlinking={chatMessagesUnreadCount > 0}
          />
          <NavBarItem text={<T message="Settings" />} to={routes.settings} />
        </NavBar>
        {this.props.children}
      </div>
    );
  }
}

export default withChat(BodyWrapper);
