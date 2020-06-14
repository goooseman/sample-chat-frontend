import React from "react";
import { defaultThemeName, ThemeName } from "src/config/themes";
import createContextHOC from "./createContextHOC";

export interface WithTheme {
  activeTheme: ThemeName;
  setActiveTheme(theme: ThemeName): void;
  resetActiveTheme(): void;
}

interface ThemeContextProviderState extends Pick<WithTheme, "activeTheme"> {}

const { Provider, Consumer } = React.createContext<WithTheme>({
  activeTheme: defaultThemeName,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveTheme: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetActiveTheme: () => {},
});

export class ThemeContextProvider extends React.PureComponent<
  Partial<ThemeContextProviderState>,
  ThemeContextProviderState
> {
  constructor(props: Partial<WithTheme>) {
    super(props);
    this.state = {
      activeTheme: defaultThemeName,
    };
  }

  public render(): React.ReactNode {
    const { state, props } = this;

    const providerValue = {
      activeTheme: props.activeTheme || state.activeTheme,
      setActiveTheme: this.setActiveTheme,
      resetActiveTheme: this.resetActiveTheme,
    };

    return <Provider value={providerValue}>{props.children}</Provider>;
  }

  private setActiveTheme = (theme: ThemeName) => {
    this.setState({
      activeTheme: theme,
    });
  };

  private resetActiveTheme = () => {
    this.setState({
      activeTheme: defaultThemeName,
    });
  };
}

export const withTheme = createContextHOC(Consumer);
