import { RouteComponentProps } from "react-router-dom";
import React, { PureComponent } from "react";
import SettingsPage from "./SettingsPage";
import { withSettings, WithSettings } from "src/contexts/SettingsContext";
import { Locale } from "src/config/locales";

interface SettingsPageContainerProps
  extends RouteComponentProps,
    WithSettings {}

class SettingsPageContainer extends PureComponent<SettingsPageContainerProps> {
  render(): React.ReactNode {
    const { username, lang } = this.props;

    return (
      <SettingsPage
        username={username}
        locale={lang}
        onUsernameChange={this.handleUsernameChange}
        onResetDefaultClick={this.handleResetDefaultClick}
        onLocaleChange={this.handleLocaleChange}
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
}

export default withSettings(SettingsPageContainer);
