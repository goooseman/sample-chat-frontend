import React, { PureComponent } from "react";
import { WithTheme, withTheme } from "src/contexts/ThemeContext";
import cn from "clsx";

interface ThemeClassWrapperProps extends WithTheme {
  children: React.ReactChild;
}

class ThemeClassWrapper extends PureComponent<ThemeClassWrapperProps> {
  render() {
    return (
      <div className={cn(`theme-${this.props.activeTheme}`)}>
        {this.props.children}
      </div>
    );
  }
}

export default withTheme(ThemeClassWrapper);
