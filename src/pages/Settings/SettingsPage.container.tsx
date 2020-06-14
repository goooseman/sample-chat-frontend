import { RouteComponentProps } from "react-router-dom";
import React, { PureComponent } from "react";
import SettingsPage from "./SettingsPage";
import { withSettings, WithSettings } from "src/contexts/SettingsContext";

interface SettingsPageContainerProps
  extends RouteComponentProps,
    WithSettings {}

class SettingsPageContainer extends PureComponent<SettingsPageContainerProps> {
  render(): React.ReactNode {
    return (
      <SettingsPage
        onUsernameChange={this.handleUsernameChange}
        onResetDefaultClick={this.handleResetDefaultClick}
      />
    );
  }

  private handleUsernameChange = (username: string): void => {
    this.props.setSettings({ username });
  };

  private handleResetDefaultClick = () => {
    this.props.resetSettings();
  };
}

export default withSettings(SettingsPageContainer);
