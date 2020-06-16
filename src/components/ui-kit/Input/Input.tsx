import React, { PureComponent } from "react";
import classes from "./Input.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";

interface CommonInputProps {
  labelledWith?: React.ReactNode;
}

interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  id: string;
  component: "textarea";
}

interface InpurProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  component: "input";
}

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  id: string;
  component: "select";
}

export type InputElementProps = TextAreaProps | InpurProps | SelectProps;

/**
 * Custom `Input` component to be used as a drop-in replacement for `<input />`, `<select />`, `<textarea />`.
 */
class Input extends PureComponent<InputElementProps & CommonInputProps> {
  render(): React.ReactNode {
    const { labelledWith } = this.props;

    return (
      <div
        className={cn(classes.container, {
          [classes.containerInline]: this.isInline(),
        })}
      >
        {labelledWith ? (
          <Typography
            className={cn(classes.label)}
            variant="label"
            htmlFor={this.props.id}
          >
            {labelledWith}
          </Typography>
        ) : null}
        {this.getInputElement()}
      </div>
    );
  }

  private isInline = (): boolean => {
    return (
      this.props.component === "input" &&
      (this.props.type === "radio" || this.props.type === "checkbox")
    );
  };

  private getInputElement = (): React.ReactNode => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { component, className, labelledWith, ...inputProps } = this.props;

    switch (component) {
      case "textarea":
        return (
          <textarea
            {...(inputProps as TextAreaProps)}
            className={cn(className, classes.common)}
          />
        );

      case "input":
        return (
          <input
            {...(inputProps as InpurProps)}
            className={cn(className, classes.common)}
          />
        );
      case "select":
        return (
          <select
            {...(inputProps as SelectProps)}
            className={cn(className, classes.common)}
          />
        );
      default:
        return null;
    }
  };
}

export default Input;
