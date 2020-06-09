import React, { PureComponent } from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

class Button extends PureComponent<ButtonProps> {
  render(): React.ReactNode {
    const { children, ...otherProps } = this.props;

    return <button {...otherProps}>{children}</button>;
  }
}

export default Button;
