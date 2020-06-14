import React from "react";
import createContextHOC from "./createContextHOC";

interface SettingsContextProviderState {
  username?: string;
  is12hours: boolean;
  isCtrlEnterToSend: boolean;
}

export interface WithSettings extends SettingsContextProviderState {
  setSettings: (state: Partial<SettingsContextProviderState>) => void;
  resetSettings: () => void;
}

const defaults: SettingsContextProviderState = {
  is12hours: false,
  isCtrlEnterToSend: true,
};

const { Provider, Consumer } = React.createContext<WithSettings>({
  ...defaults,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSettings: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetSettings: () => {},
});

export class SettingsContextProvider extends React.PureComponent<
  Partial<SettingsContextProviderState>,
  SettingsContextProviderState
> {
  constructor(props: Partial<WithSettings>) {
    super(props);
    this.state = defaults;
  }

  public render(): React.ReactNode {
    const { state, props } = this;

    const providerValue = {
      ...state,
      ...props,
      setSettings: this.setSettings,
      resetSettings: this.resetSettings,
    };

    return <Provider value={providerValue}>{props.children}</Provider>;
  }

  private setSettings = (settings: Partial<SettingsContextProviderState>) => {
    this.setState((state: SettingsContextProviderState) => ({
      ...state,
      ...settings,
    }));
  };

  private resetSettings = () => {
    this.setState(defaults);
  };
}

export const withSettings = createContextHOC(Consumer);
