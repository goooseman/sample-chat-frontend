import React, { PureComponent } from "react";
import "src/styles/global.css";
import { ThemeContextProvider } from "src/contexts/ThemeContext";
import ThemeClassWrapper from "./ThemeClassWrapper";

interface StorybookSharedWrapperProps {
  children: React.ReactChild;
}

class StorybookSharedWrapper extends PureComponent<
  StorybookSharedWrapperProps
> {
  render(): React.ReactNode {
    return (
      <ThemeContextProvider>
        <ThemeClassWrapper>{this.props.children}</ThemeClassWrapper>
      </ThemeContextProvider>
    );
  }
}

export default StorybookSharedWrapper;
