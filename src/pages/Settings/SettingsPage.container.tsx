import { RouteComponentProps } from "react-router-dom";
import React, { PureComponent } from "react";
import SettingsPage from "./SettingsPage";
import { withSettings, WithSettings } from "src/contexts/SettingsContext";
import { WithLocale, withLocale } from "react-targem";
import { Locale } from "src/config/locales";

interface SettingsPageContainerProps
  extends RouteComponentProps,
    WithSettings,
    WithLocale {}

class SettingsPageContainer extends PureComponent<SettingsPageContainerProps> {
  render(): React.ReactNode {
    const { username, locale } = this.props;

    return (
      <SettingsPage
        username={username}
        locale={locale as Locale}
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
    // TODO should not be English, but should be browser's language
    // But a PR to react-targem is required
    this.props.changeLocale && this.props.changeLocale("en-GB");
  };

  private handleLocaleChange = (locale: Locale) => {
    this.props.changeLocale && this.props.changeLocale(locale);
  };
}

export default withLocale(withSettings(SettingsPageContainer));
