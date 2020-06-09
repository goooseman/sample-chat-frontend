import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import StorybookSharedWrapper from "../src/wrappers/StorybookSharedWrapper";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

addDecorator((story) =>
  React.createElement(StorybookSharedWrapper, {}, story())
);

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
