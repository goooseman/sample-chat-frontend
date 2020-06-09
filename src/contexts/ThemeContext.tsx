import React from "react";
import { defaultThemeName, ThemeName } from "src/config/themes";
import createContextHOC from "./createContextHOC";

export interface WithTheme {
  activeTheme: ThemeName;
  setActiveTheme(theme: ThemeName): void;
}

const { Provider, Consumer } = React.createContext<WithTheme>({
  activeTheme: defaultThemeName,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveTheme: () => {},
});

export class ThemeContextProvider extends React.PureComponent<{}, WithTheme> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeTheme: defaultThemeName,
      setActiveTheme: this.setActiveTheme,
    };
  }

  public render(): React.ReactNode {
    const { state, props } = this;
    return <Provider value={state}>{props.children}</Provider>;
  }

  private setActiveTheme = (theme: ThemeName) => {
    this.setState({
      activeTheme: theme,
    });
  };
}

export const withTheme = createContextHOC(Consumer);
