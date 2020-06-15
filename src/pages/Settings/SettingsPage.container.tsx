import { RouteComponentProps } from "react-router-dom";
import React, { PureComponent } from "react";
import SettingsPage from "./SettingsPage";
import { withSettings, WithSettings } from "src/contexts/SettingsContext";

interface SettingsPageContainerProps
  extends RouteComponentProps,
    WithSettings {}

class SettingsPageContainer extends PureComponent<SettingsPageContainerProps> {
  render(): React.ReactNode {
    const { is12hours, isCtrlEnterToSend, username, lang, theme } = this.props;

    return (
      <SettingsPage
        username={username}
        locale={lang}
        theme={theme}
        is12hours={is12hours}
        isCtrlEnterToSend={isCtrlEnterToSend}
        onResetDefaultClick={this.handleResetDefaultClick}
        onUsernameChange={this.handleFieldChange("username")}
        onLocaleChange={this.handleFieldChange("lang")}
        onThemeChange={this.handleFieldChange("theme")}
        onIs12hoursChange={this.handleFieldChange("is12hours")}
        onIsCtrlEnterToSend={this.handleFieldChange("isCtrlEnterToSend")}
      />
    );
  }

  private handleFieldChange = (field: string) => (value: unknown) => {
    this.props.setSettings({ [field]: value });
  };

  private handleResetDefaultClick = () => {
    this.props.resetSettings();
  };
}

export default withSettings(SettingsPageContainer);
