import React from "react";
import SettingsPage from "./SettingsPage";
import { action } from "@storybook/addon-actions";

export default { title: "pages/Settings", component: SettingsPage };

const handleResetDefaultClick = action("onResetDefaultClick");
const handleUsernameChange = action("onUsernameChange");

export const withDefaultView = (): React.ReactNode => (
  <SettingsPage
    onResetDefaultClick={handleResetDefaultClick}
    onUsernameChange={handleUsernameChange}
  />
);
