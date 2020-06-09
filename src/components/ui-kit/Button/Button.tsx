import React, { PureComponent } from "react";
import classes from "./Button.css";
import cn from "clsx";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

class Button extends PureComponent<ButtonProps> {
  render(): React.ReactNode {
    const { children, className, ...otherProps } = this.props;

    return (
      <button className={cn(classes.button, className)} {...otherProps}>
        {children}
      </button>
    );
  }
}

export default Button;
