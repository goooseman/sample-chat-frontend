import React, { PureComponent } from "react";
import { ThemeContextProvider } from "src/contexts/ThemeContext";
import StorybookSharedWrapper from "src/wrappers/StorybookSharedWrapper";

interface AppWrapperProps {
  children: React.ReactChild;
}

class AppWrapper extends PureComponent<AppWrapperProps> {
  render(): React.ReactNode {
    return (
      <ThemeContextProvider>
        <StorybookSharedWrapper>{this.props.children}</StorybookSharedWrapper>
      </ThemeContextProvider>
    );
  }
}

export default AppWrapper;
