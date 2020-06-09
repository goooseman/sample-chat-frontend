import React from "react";
import { addDecorator } from "@storybook/react";
import StorybookSharedWrapper from "../src/wrappers/StorybookSharedWrapper";

addDecorator((story) =>
  React.createElement(StorybookSharedWrapper, {}, story())
);
