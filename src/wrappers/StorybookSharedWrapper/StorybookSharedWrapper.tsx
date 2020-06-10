import React, { PureComponent } from "react";
import { WithTheme, withTheme } from "src/contexts/ThemeContext";
import cn from "clsx";
import "src/styles/global.css";
import { withLocale, WithLocaleStateful } from "react-targem";
import { BrowserRouter } from "react-router-dom";

interface StorybookSharedWrapperProps extends WithTheme, WithLocaleStateful {
  children: React.ReactChild;
}

class StorybookSharedWrapper extends PureComponent<
  StorybookSharedWrapperProps
> {
  render() {
    const { direction, activeTheme, children } = this.props;

    return (
      <BrowserRouter>
        <React.StrictMode>
          <div className={cn(`theme-${activeTheme}`)} dir={direction}>
            {children}
          </div>
        </React.StrictMode>
      </BrowserRouter>
    );
  }
}

export default withLocale(withTheme(StorybookSharedWrapper));
