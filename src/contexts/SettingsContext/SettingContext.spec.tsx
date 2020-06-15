/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import {
  SettingsContextProvider,
  WithSettings,
  withSettings,
} from "./SettingsContext";
import { render, fireEvent } from "__utils__/render";

class WithSettingsTester extends React.PureComponent<WithSettings> {
  public render(): React.ReactNode {
    const { username, userId } = this.props;

    return (
      <>
        <button onClick={this.handleUsernameChangeClick}>
          Change username!
        </button>
        <button onClick={this.handleResetClick}>Reset!</button>
        <span>Username: {username}</span>
        <input title="User ID" value={userId} onChange={() => {}} />
      </>
    );
  }

  private handleUsernameChangeClick = () => {
    this.props.setSettings({
      username: "foo",
    });
  };

  private handleResetClick = () => {
    this.props.resetSettings();
  };
}

const WithSettingsTesterHocd = withSettings(WithSettingsTester);

describe("withSettings", () => {
  const TestContainer = (
    <SettingsContextProvider>
      <WithSettingsTesterHocd />
    </SettingsContextProvider>
  );
  it("should change username", () => {
    const { getByText } = render(TestContainer);
    fireEvent.click(getByText("Change username!"));
    expect(getByText("Username: foo")).toBeInTheDocument();
  });

  it("should generate new User ID if settings are reset", () => {
    const { getByTitle, getByText } = render(TestContainer);
    const userId = (getByTitle("User ID") as HTMLInputElement).value;
    fireEvent.click(getByText("Reset!"));
    expect(getByTitle("User ID")).not.toHaveValue(userId);
  });
});
