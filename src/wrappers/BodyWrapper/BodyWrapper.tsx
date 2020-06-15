import React, { PureComponent } from "react";
import classes from "./BodyWrapper.css";
import cn from "clsx";
import { NavBar, NavBarItem } from "src/components/ui-kit/NavBar";
import { T } from "react-targem";
import { routes } from "src/config/routes";

interface BodyWrapperProps {
  children: React.ReactNode;
}

class BodyWrapper extends PureComponent<BodyWrapperProps> {
  render(): React.ReactNode {
    return (
      <div className={cn(classes.container)}>
        <NavBar>
          <NavBarItem text={<T message="Chat" />} to={routes.home} />
          <NavBarItem text={<T message="Settings" />} to={routes.settings} />
        </NavBar>
        {this.props.children}
      </div>
    );
  }
}

export default BodyWrapper;
