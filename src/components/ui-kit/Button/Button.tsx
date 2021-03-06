import React, { PureComponent } from "react";
import classes from "./Button.css";
import cn from "clsx";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size: "sm" | "md" | "lg";
  color: "primary" | "secondary";
  hasBorderRadius: boolean;
}

/**
 * Custom `Button` component to be used as a drop-in replacement for `<button />`.
 */
class Button extends PureComponent<ButtonProps> {
  public static defaultProps = {
    size: "md",
    hasBorderRadius: true,
    color: "primary",
  };

  render(): React.ReactNode {
    const {
      children,
      className,
      size,
      hasBorderRadius,
      color,
      ...otherProps
    } = this.props;

    return (
      <button
        className={cn(className, classes.button, {
          [classes.buttonLg]: size === "lg",
          [classes.buttonSm]: size === "sm",
          [classes.borderRadius]: hasBorderRadius,
          [classes.buttonSecondary]: color === "secondary",
        })}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
}

export default Button;
