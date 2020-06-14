import React from "react";
import SettingsPageContainer from "./SettingsPage.container";
import { render, fireEvent } from "__utils__/renderWithRouter";
import { withRouter } from "react-router-dom";

const Container = withRouter(SettingsPageContainer);

const resetDefaultsButtonText = "Reset to defaults";

it("should call reset settings method when 'Reset to defaults' is clicked", () => {
  const resetSettingsSpy = jest.fn();
  const { getByText } = render(<Container resetSettings={resetSettingsSpy} />);
  const button = getByText(resetDefaultsButtonText);
  fireEvent.click(button);

  expect(resetSettingsSpy).toBeCalledTimes(1);
});

it("should call set settings method when username field is changed", () => {
  const setSettingsSpy = jest.fn();
  const { getByLabelText } = render(<Container setSettings={setSettingsSpy} />);
  const input = getByLabelText("Username");
  fireEvent.change(input, {
    target: {
      value: "foo",
    },
  });

  expect(setSettingsSpy).toBeCalledWith({ username: "foo" });
});
