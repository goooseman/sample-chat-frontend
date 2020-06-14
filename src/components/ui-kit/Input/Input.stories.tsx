import React from "react";
import Input from "./Input";
import { action } from "@storybook/addon-actions";

export default { title: "components/ui-kit/Input", component: Input };

const handleChange = action("onClick");

export const withTextarea = (): React.ReactNode => (
  <Input type="textarea" onChange={handleChange} />
);

export const withTextareaAndPlaceholder = (): React.ReactNode => (
  <Input
    type="textarea"
    placeholder="Type something..."
    onChange={handleChange}
  />
);
