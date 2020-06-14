import React, { PureComponent } from "react";
import classes from "./Input.css";
import cn from "clsx";

interface InputProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  type: "textarea";
}

class Input extends PureComponent<InputProps> {
  render(): React.ReactNode {
    const { type, className, ...otherProps } = this.props;
    const Component = type;
    return (
      <Component
        className={cn({ [classes.common]: true, [className || ""]: true })}
        {...otherProps}
      />
    );
  }
}

export default Input;
