import React, { PureComponent } from "react";
import classes from "./NavBar.css";
import cn from "clsx";
import { NavLink } from "react-router-dom";
import Typography from "../Typography";

interface NavBarProps {
  children: React.ReactNode;
}

export class NavBar extends PureComponent<NavBarProps> {
  render(): React.ReactNode {
    return <div className={cn(classes.container)}>{this.props.children}</div>;
  }
}

interface NavBarItemProps {
  text: React.ReactNode;
  to: string;
  badge?: number;
}

export class NavBarItem extends PureComponent<NavBarItemProps> {
  render(): React.ReactNode {
    const { badge, text, to } = this.props;

    return (
      <NavLink
        activeClassName={cn(classes.itemActive)}
        to={to}
        exact
        className={cn(classes.item)}
      >
        <span className={cn(classes.text)}>{text}</span>
        {badge ? (
          <Typography gutterBottom={false} className={cn(classes.badge)}>
            {" "}
            {badge}
          </Typography>
        ) : null}
      </NavLink>
    );
  }
}
