import React from "react";
import Button from "./Button";
import { action } from "@storybook/addon-actions";

export default { title: "components/ui-kit/Button", component: Button };

const handleClick = action("onClick");

export const withText = (): React.ReactNode => (
  <Button onClick={handleClick}>Hello Button</Button>
);

export const withoutBorderRadius = (): React.ReactNode => (
  <Button onClick={handleClick} hasBorderRadius={false}>
    Hello Button
  </Button>
);

export const withEmoji = (): React.ReactNode => (
  <Button onClick={handleClick}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

export const largeWithText = (): React.ReactNode => (
  <Button size="lg" onClick={handleClick}>
    Hello Button
  </Button>
);
