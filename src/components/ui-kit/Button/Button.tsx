import React, { PureComponent } from "react";
import classes from "./Button.css";
import cn from "clsx";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size: "md" | "lg";
}

/**
 * Custom `Button` component to be used as a drop-in replacement for `<button />`.
 */
class Button extends PureComponent<ButtonProps> {
  public static defaultProps = {
    size: "md",
  };

  render(): React.ReactNode {
    const { children, className, size, ...otherProps } = this.props;

    return (
      <button
        className={cn({
          [classes.button]: true,
          [className || ""]: true,
          [classes.buttonLg]: size === "lg",
        })}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
}

export default Button;
