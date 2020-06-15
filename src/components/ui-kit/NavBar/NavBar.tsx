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
  isBlinking: boolean;
}

interface NavBarItemState {
  isDark: boolean;
}

export class NavBarItem extends PureComponent<
  NavBarItemProps,
  NavBarItemState
> {
  static defaultProps: Partial<NavBarItemProps> = {
    isBlinking: false,
  };

  public blinkingInverval?: NodeJS.Timeout;

  public state: NavBarItemState = {
    isDark: false,
  };

  public componentDidMount(): void {
    if (this.props.isBlinking) {
      this.startBlinking();
    }
  }

  public componentDidUpdate(prevProps: NavBarItemProps): void {
    if (prevProps.isBlinking === this.props.isBlinking) {
      return;
    }
    if (this.props.isBlinking) {
      this.startBlinking();
      return;
    }
    this.stopBlinking();
  }

  public componentWillUnmount(): void {
    this.stopBlinking();
  }

  render(): React.ReactNode {
    const { badge, text, to } = this.props;
    const { isDark } = this.state;

    return (
      <NavLink
        activeClassName={cn(classes.itemActive)}
        to={to}
        exact
        className={cn(classes.item, {
          [classes.itemDark]: isDark,
        })}
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

  private startBlinking = () => {
    this.blinkingInverval = setInterval(() => {
      this.setState((state: NavBarItemState) => ({
        isDark: !state.isDark,
      }));
    }, 1000);
  };

  private stopBlinking = () => {
    if (this.blinkingInverval) {
      clearInterval(this.blinkingInverval);
    }
  };
}
