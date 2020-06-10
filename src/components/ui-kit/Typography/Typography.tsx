import React, { PureComponent } from "react";
import classes from "./Typography.css";
import cn from "clsx";

interface TypographyProps {
  variant: "p" | "h1" | "h2" | "h3"; // Inlined to be displayed in Storybook Docs
  color: "normal" | "contrast" | "danger";
  children: React.ReactChild;
  className?: string;
  style?: React.CSSProperties;
}

/** A component to be used as a drop-in replacement for `<p />`, `<h1 />`, `<h2 />`, `<h3 />` */
class Typography extends PureComponent<TypographyProps> {
  public static defaultProps = {
    variant: "p",
    color: "normal",
  };

  render(): React.ReactNode {
    const { variant, children, style } = this.props;
    const Component = variant;

    return (
      <Component style={style} className={this.getClassName()}>
        {children}
      </Component>
    );
  }

  private getClassName = (): string => {
    const { variant, className, color } = this.props;
    return cn({
      [classes.p]: variant === "p",
      [classes.h1]: variant === "h1",
      [classes.h2]: variant === "h2",
      [classes.h3]: variant === "h3",
      [className || ""]: true,
      [classes.colorContrast]: color === "contrast",
      [classes.colorDanger]: color === "danger",
    });
  };
}

export default Typography;
