import React, { PureComponent } from "react";
import { WithSettings, withSettings } from "src/contexts/SettingsContext";
import cn from "clsx";
import "src/styles/global.css";
import { withLocale, WithLocaleStateful } from "react-targem";
import { BrowserRouter } from "react-router-dom";

interface StorybookSharedWrapperProps extends WithSettings, WithLocaleStateful {
  children: React.ReactChild;
}

class StorybookSharedWrapper extends PureComponent<
  StorybookSharedWrapperProps
> {
  render() {
    const { direction, theme, children } = this.props;

    return (
      <BrowserRouter>
        <React.StrictMode>
          <div className={cn(`theme-${theme}`)} dir={direction}>
            {children}
          </div>
        </React.StrictMode>
      </BrowserRouter>
    );
  }
}

export default withLocale(withSettings(StorybookSharedWrapper));
