import React, { PureComponent } from "react";
import classes from "./Button.css";
import cn from "clsx";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size: "md" | "lg";
  hasBorderRadius: boolean;
}

/**
 * Custom `Button` component to be used as a drop-in replacement for `<button />`.
 */
class Button extends PureComponent<ButtonProps> {
  public static defaultProps = {
    size: "md",
    hasBorderRadius: true,
  };

  render(): React.ReactNode {
    const {
      children,
      className,
      size,
      hasBorderRadius,
      ...otherProps
    } = this.props;

    return (
      <button
        className={cn(className, classes.button, {
          [classes.buttonLg]: size === "lg",
          [classes.borderRadius]: hasBorderRadius,
        })}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
}

export default Button;
