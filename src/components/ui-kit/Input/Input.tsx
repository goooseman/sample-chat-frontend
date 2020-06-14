import React, { PureComponent } from "react";
import classes from "./Input.css";
import cn from "clsx";
import Typography from "../Typography";

interface CommonInputProps {
  labelledWith?: React.ReactNode;
}

interface InputPropsTextarea
  extends CommonInputProps,
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    > {
  id: string;
  type: "textarea";
}

interface InputPropsInput
  extends CommonInputProps,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {
  id: string;
  inputType: HTMLInputElement["type"];
  type: "input";
}

type InputProps = InputPropsTextarea | InputPropsInput;

class Input extends PureComponent<InputProps> {
  render(): React.ReactNode {
    let element: React.ReactNode;

    if (this.props.type === "textarea") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { className, labelledWith, type, ...otherProps } = this.props;
      element = (
        <textarea
          {...otherProps}
          className={cn({ [classes.common]: true, [className || ""]: true })}
        />
      );
    }

    if (this.props.type === "input") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { className, inputType, labelledWith, ...otherProps } = this.props;

      element = (
        <input
          {...otherProps}
          className={cn({ [classes.common]: true, [className || ""]: true })}
          type={inputType}
        />
      );
    }

    return (
      <div className={cn(classes.container)}>
        {this.props.labelledWith ? (
          <Typography variant="label" htmlFor={this.props.id}>
            {this.props.labelledWith}
          </Typography>
        ) : null}
        {element}
      </div>
    );
  }
}

export default Input;
