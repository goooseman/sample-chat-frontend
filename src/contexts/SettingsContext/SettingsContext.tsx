import React from "react";
import createContextHOC from "../createContextHOC";
import { defaultThemeName, ThemeName } from "src/config/themes";
import { Locale, locales } from "src/config/locales";
import { getBrowserLocale } from "src/utils/locales";
import { v4 as uuidv4 } from "uuid";

interface SettingsContextProviderState {
  username?: string;
  lang: Locale;
  theme: ThemeName;
  is12hours: boolean;
  isCtrlEnterToSend: boolean;
  userId: string;
}

export interface WithSettings extends SettingsContextProviderState {
  setSettings: (state: Partial<SettingsContextProviderState>) => void;
  resetSettings: () => void;
}

const getInitialValues = (): SettingsContextProviderState => ({
  theme: defaultThemeName,
  is12hours: false,
  isCtrlEnterToSend: true,
  lang: getBrowserLocale(
    locales.map((l) => l.key),
    locales[0].key
  ),
  userId: uuidv4(),
  username: "",
});

const { Provider, Consumer } = React.createContext<WithSettings>({
  ...getInitialValues(),
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
    this.state = getInitialValues();
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
    this.setState(getInitialValues());
  };
}

export const withSettings = createContextHOC(Consumer);
