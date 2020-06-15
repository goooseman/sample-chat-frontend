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

interface StringLike {
  toString: () => string;
}

class RadioGroup<P extends StringLike> extends PureComponent<
  RadioGroupProps<P>
> {
  render(): React.ReactNode {
    const {
      className,
      id,
      labelledWith,
      options,
      onChange,
      value,
    } = this.props;

    const titleId = `${id.toString()}-title`;

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
            <RadioGroupItem
              key={o.value.toString()}
              onChange={onChange}
              value={o.value}
              text={o.text}
              activeValue={value}
            />
          ))}
        </div>
      </div>
    );
  }
}

interface RadioGroupItemProps<P> {
  value: P;
  text: React.ReactNode;
  activeValue: P;
  onChange: (value: P) => void;
}

class RadioGroupItem<P extends StringLike> extends PureComponent<
  RadioGroupItemProps<P>
> {
  render(): React.ReactNode {
    const { activeValue, value, text } = this.props;

    return (
      <Input
        key={value.toString()}
        id={value.toString()}
        type="input"
        inputType="radio"
        labelledWith={text}
        value={value.toString()}
        checked={activeValue === value}
        onChange={this.handleChange}
      />
    );
  }

  private handleChange = (): void => {
    this.props.onChange(this.props.value);
  };
}

export default RadioGroup;
