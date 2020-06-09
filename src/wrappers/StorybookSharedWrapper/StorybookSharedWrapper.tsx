import React, { PureComponent } from "react";
import { WithTheme, withTheme } from "src/contexts/ThemeContext";
import cn from "clsx";
import "src/styles/global.css";

interface StorybookSharedWrapperProps extends WithTheme {
  children: React.ReactChild;
}

class StorybookSharedWrapper extends PureComponent<
  StorybookSharedWrapperProps
> {
  render() {
    return (
      <div className={cn(`theme-${this.props.activeTheme}`)}>
        {this.props.children}
      </div>
    );
  }
}

export default withTheme(StorybookSharedWrapper);
