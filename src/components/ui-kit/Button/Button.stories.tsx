import React from "react";
import Button from "./Button";

export default { title: "components/ui-kit/Button" };

export const withText = (): React.ReactNode => <Button>Hello Button</Button>;

export const withEmoji = (): React.ReactNode => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
