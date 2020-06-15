import React from "react";
import SettingsPage from "./SettingsPage";
import { action } from "@storybook/addon-actions";

export default { title: "pages/Settings", component: SettingsPage };

const handleResetDefaultClick = action("onResetDefaultClick");
const handleUsernameChange = action("onUsernameChange");
const handleLocaleChange = action("onLocaleChange");
const handleThemeChange = action("onThemeChange");
const handleIs12hoursChange = action("onIs12hoursChange");
const handleIsCtrlEnterToSend = action("onIsCtrlEnterToSend");

const defaultProps = {
  onResetDefaultClick: handleResetDefaultClick,
  onUsernameChange: handleUsernameChange,
  onLocaleChange: handleLocaleChange,
  onThemeChange: handleThemeChange,
  onIs12hoursChange: handleIs12hoursChange,
  onIsCtrlEnterToSend: handleIsCtrlEnterToSend,
  locale: "en-GB",
  username: "goooseman",
  theme: "default",
  is12hours: true,
  isCtrlEnterToSend: false,
} as const;

export const withDefaultView = (): React.ReactNode => (
  <SettingsPage {...defaultProps} />
);
