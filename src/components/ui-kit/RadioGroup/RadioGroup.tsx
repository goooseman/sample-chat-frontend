import React, { PureComponent } from "react";
import classes from "./RadioGroup.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import Input from "src/components/ui-kit/Input";

interface RadioGroupProps<P> {
  labelledWith: React.ReactNode;
  options: {
    value: P;
    text: React.ReactNode;
  }[];
  onChange: (value: P) => void;
  value: P;
  id: string;
  className?: string;
}

class RadioGroup<P extends string> extends PureComponent<RadioGroupProps<P>> {
  render(): React.ReactNode {
    const { className, id, labelledWith, options, value } = this.props;

    const titleId = `${id}-title`;

    return (
      <div
        role="radiogroup"
        className={cn(className, classes.container)}
        aria-labelledby={titleId}
      >
        {labelledWith ? (
          <Typography id={titleId}>{labelledWith}</Typography>
        ) : null}
        <div className={cn(classes.radiosContainer)}>
          {options.map((o) => (
            <Input
              key={o.value}
              id={o.value}
              type="input"
              inputType="radio"
              labelledWith={o.text}
              value={o.value}
              checked={o.value === value}
              onChange={this.handleChange}
            />
          ))}
        </div>
      </div>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(event.target.value as P);
  };
}

export default RadioGroup;
