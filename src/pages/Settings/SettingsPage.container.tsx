import { RouteComponentProps } from "react-router-dom";
import React, { PureComponent } from "react";
import SettingsPage from "./SettingsPage";
import { withSettings, WithSettings } from "src/contexts/SettingsContext";
import { Locale } from "src/config/locales";
import { ThemeName } from "src/config/themes";

interface SettingsPageContainerProps
  extends RouteComponentProps,
    WithSettings {}

class SettingsPageContainer extends PureComponent<SettingsPageContainerProps> {
  render(): React.ReactNode {
    const { username, lang, theme } = this.props;

    return (
      <SettingsPage
        username={username}
        locale={lang}
        theme={theme}
        onUsernameChange={this.handleUsernameChange}
        onResetDefaultClick={this.handleResetDefaultClick}
        onLocaleChange={this.handleLocaleChange}
        onThemeChange={this.handleThemeChange}
      />
    );
  }

  private handleUsernameChange = (username: string): void => {
    this.props.setSettings({ username });
  };

  private handleResetDefaultClick = () => {
    this.props.resetSettings();
  };

  private handleLocaleChange = (lang: Locale) => {
    this.props.setSettings({ lang });
  };

  private handleThemeChange = (theme: ThemeName) => {
    this.props.setSettings({ theme });
  };
}

export default withSettings(SettingsPageContainer);
