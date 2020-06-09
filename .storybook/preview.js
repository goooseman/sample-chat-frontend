import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import StorybookSharedWrapper from "../src/wrappers/StorybookSharedWrapper";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withA11y } from "@storybook/addon-a11y";
import "@storybook/addon-console";

addDecorator(withA11y);

addDecorator((story) =>
  React.createElement(StorybookSharedWrapper, {}, story())
);

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
