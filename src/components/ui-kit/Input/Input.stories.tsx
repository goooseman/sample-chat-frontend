import React from "react";
import Input from "./Input";
import { action } from "@storybook/addon-actions";

export default { title: "components/ui-kit/Input", component: Input };

const handleChange = action("onClick");

const defaultProps = {
  id: "story",
  inputType: "text",
  type: "input",
  onChange: handleChange,
} as const;

export const withInput = (): React.ReactNode => <Input {...defaultProps} />;

export const withInputNumber = (): React.ReactNode => (
  <Input {...defaultProps} inputType="number" />
);

export const withLabelledInput = (): React.ReactNode => (
  <Input {...defaultProps} labelledWith="A label" />
);

const defaultTextAreaProps = {
  id: "story",
  type: "textarea",
  onChange: handleChange,
} as const;

export const withTextarea = (): React.ReactNode => (
  <Input {...defaultTextAreaProps} />
);

export const withLabelledTextarea = (): React.ReactNode => (
  <Input {...defaultTextAreaProps} labelledWith="A label" />
);

export const withTextareaAndPlaceholder = (): React.ReactNode => (
  <Input {...defaultTextAreaProps} placeholder="Type something..." />
);
