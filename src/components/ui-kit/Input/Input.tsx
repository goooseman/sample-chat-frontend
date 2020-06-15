import React, { PureComponent } from "react";
import classes from "./Input.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";

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

interface InputPropsSelect
  extends CommonInputProps,
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    > {
  id: string;
  type: "select";
}

type InputProps = InputPropsTextarea | InputPropsInput | InputPropsSelect;

class Input extends PureComponent<InputProps> {
  render(): React.ReactNode {
    let element: React.ReactNode;

    if (this.props.type === "textarea") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { className, labelledWith, type, ...otherProps } = this.props;
      element = (
        <textarea {...otherProps} className={cn(className, classes.common)} />
      );
    }

    if (this.props.type === "input") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { className, inputType, labelledWith, ...otherProps } = this.props;

      element = (
        <input
          {...otherProps}
          className={cn(className, classes.common)}
          type={inputType}
        />
      );
    }

    if (this.props.type === "select") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { className, labelledWith, ...otherProps } = this.props;

      element = (
        <select {...otherProps} className={cn(className, classes.common)} />
      );
    }

    return (
      <div
        className={cn(classes.container, {
          [classes.containerInline]: this.isInline(),
        })}
      >
        {this.props.labelledWith ? (
          <Typography
            className={cn(classes.label)}
            variant="label"
            htmlFor={this.props.id}
          >
            {this.props.labelledWith}
          </Typography>
        ) : null}
        {element}
      </div>
    );
  }

  private isInline = (): boolean => {
    return (
      this.props.type === "input" &&
      (this.props.inputType === "radio" || this.props.inputType === "checkbox")
    );
  };
}

export default Input;
